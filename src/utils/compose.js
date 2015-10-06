import assign from 'lodash/object/assign';
import forEach from 'lodash/collection/forEach';
import merge from 'lodash/object/merge';

import {
  parseDesc,
  wrapMethods,
} from '.';

/**
 * Given a description object, return a stamp aka composable.
 *
 * (desc?: reactDesc || specDesc): stamp
 */
function createStamp(desc = {}) {
  const specDesc = parseDesc(desc);

  const stamp = (options, ...args) => {
    let instance = Object.create(specDesc.methods || {});

    merge(instance, specDesc.deepProperties);
    assign(instance, specDesc.properties, specDesc.configuration);
    Object.defineProperties(instance, specDesc.propertyDescriptors || {});

    if (specDesc.initializers) {
      specDesc.initializers.forEach(initializer => {
        const result = initializer.call(instance, options, { instance, stamp, args });
        if (result) instance = result;
      });
    }

    return instance;
  }

  merge(stamp, specDesc.deepStaticProperties);
  assign(stamp, specDesc.staticProperties);
  Object.defineProperties(stamp, specDesc.staticPropertyDescriptors || {});

  return stamp;
}

/**
 * Take any number of stamps or descriptors. Return a new stamp
 * that encapsulates combined behavior. If nothing is passed in,
 * an empty stamp is returned.
 *
 * (...args?: stamp || reactDesc || specDesc): stamp
 */
export default function compose(...args) {
  const descs = args.map(arg => arg.compose || parseDesc(arg));
  const compDesc = {};

  if (this && this.compose) {
    /**
     * Speical handling is required for statics when using
     * the ES7 stamp decorator... should we support this?
     */
    const { compose, ...statics } = this;
    statics && (compose.deepStaticProperties =
                assign({}, compose.deepStaticProperties, statics));
    descs.unshift(compose);
  }

  forEach(descs, desc => {
    const {
      initializers, methods, properties, staticProperties, propertyDescriptors,
      staticPropertyDescriptors, deepProperties, deepStaticProperties, configuration,
    } = desc;

    // Wrap React lifecycle methods
    compDesc.methods = wrapMethods(compDesc.methods, methods);

    // Stamp spec
    compDesc.initializers = (compDesc.initializers || []).concat(initializers)
      .filter(initializer => initializer !== undefined);

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
