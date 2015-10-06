import assign from 'lodash/object/assign';

import {
  compose,
  getReactDescriptor,
  parseDesc,
} from './utils';

/**
 * Given a description object, return a stamp
 * aka composable.
 *
 * @param  {Object} React The React library.
 * @param  {Object} desc A description object.
 *
 * @return {Function} A stamp.
 */
export default function reactStamp(React, desc = {}) {
  const specDesc = parseDesc(desc);
  const { methods, initializers } = getReactDescriptor(React && React.Component);

  if (initializers) {
    specDesc.initializers = initializers.concat(specDesc.initializers || []);
  }

  const stamp = (options, ...args) => {
    let instance = Object.create(assign({}, methods, specDesc.methods));

    assign(instance,
      specDesc.deepProperties, specDesc.properties,
      specDesc.configuration
    );
    Object.defineProperties(instance, specDesc.propertyDescriptors || {});

    if (specDesc.initializers) {
      specDesc.initializers.forEach(initializer => {
        const result = initializer.call(instance, options, { instance, stamp, args });
        if (result) instance = result;
      });
    }

    return instance;
  }

  assign(stamp, specDesc.deepStaticProperties, specDesc.staticProperties);
  Object.defineProperties(stamp, specDesc.staticPropertyDescriptors || {});

  stamp.compose = assign(compose.bind(stamp), specDesc);

  return stamp;
}
