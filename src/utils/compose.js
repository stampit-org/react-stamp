import assign from 'lodash/assign';
import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import { isStamp } from 'stamp-utils';

import {
  parseDesc,
  wrapMethods,
} from './';

/**
 * Given a description object, return a stamp aka composable.
 *
 * (desc?: SpecDesc) => Stamp
 */
function createStamp (specDesc = {}) {
  const Component = (options, ...args) => {
    let instance = Object.create(specDesc.methods || {});

    merge(instance, specDesc.deepProperties);
    assign(instance, specDesc.properties, specDesc.configuration);
    Object.defineProperties(instance, specDesc.propertyDescriptors || {});

    if (specDesc.initializers) {
      specDesc.initializers.forEach(initializer => {
        const result = initializer.call(instance, options,
          { instance, stamp: Component, args: [options].concat(args) });
        typeof result !== 'undefined' && (instance = result);
      });
    }

    return instance;
  };

  merge(Component, specDesc.deepStaticProperties);
  assign(Component, specDesc.staticProperties);
  Object.defineProperties(Component, specDesc.staticPropertyDescriptors || {});

  !Component.displayName && (Component.displayName = 'Component');

  return Component;
}

/**
 * Take any number of stamps or descriptors. Return a new stamp
 * that encapsulates combined behavior. If nothing is passed in,
 * an empty stamp is returned.
 *
 * (...args?: Stamp|ReactDesc|SpecDesc[]) => Stamp
 */
export default function compose (...args) {
  const descs = args.map(arg => parseDesc(arg));
  const compDesc = {};

  isStamp(this) && descs.unshift(this.compose);

  forEach(descs, desc => {
    const {
      initializers, methods, properties, staticProperties, propertyDescriptors,
      staticPropertyDescriptors, deepProperties, deepStaticProperties, configuration,
    } = desc;

    // Wrap React lifecycle methods
    compDesc.methods = wrapMethods(compDesc.methods, methods);

    // Stamp spec
    compDesc.initializers = (compDesc.initializers || []).concat(initializers)
      .filter(initializer => typeof initializer === 'function');

    forEach({ properties, staticProperties, propertyDescriptors, staticPropertyDescriptors },
      (val, key) => val && (compDesc[key] = assign(compDesc[key] || {}, val))
    );

    forEach({ deepProperties, deepStaticProperties, configuration },
      (val, key) => val && (compDesc[key] = merge(compDesc[key] || {}, val))
    );
  });

  const stamp = createStamp(compDesc);
  stamp.compose = assign(compose.bind(stamp), compDesc);

  return stamp;
}
