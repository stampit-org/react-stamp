import assign from 'lodash/object/assign';

import {
  compose,
  getReactDescriptor,
  parseDesc,
  dupeFilter,
} from './utils';

/**
 * Given a description object, return a stamp
 * aka composable.
 *
 * @param  {Object} React The React library.
 * @param  {Object} desc A description object.
 *
 * @return {Object} A stamp.
 */
export default function reactStamp(React, desc = {}) {
  const specDesc = parseDesc(desc);
  const { methods, initializers } = getReactDescriptor(React && React.Component);

  // Do not override React's `setState` and `forceUpdate` methods.
  specDesc.methods = assign({}, methods, specDesc.methods, dupeFilter);
  specDesc.initializers = (initializers || []).concat(specDesc.initializers);

  const stamp = (options, ...args) => {
    let instance = Object.create(specDesc.methods);

    assign(instance,
      specDesc.deepProperties, specDesc.properties,
      specDesc.configuration
    );
    Object.defineProperties(instance, specDesc.propertyDescriptors || {});

    specDesc.initializers.forEach(initializer => {
      const result = initializer.call(instance, options, { instance, stamp, args });
      if (result) instance = result;
    });

    return instance;
  }

  assign(stamp, specDesc.deepStaticProperties, specDesc.staticProperties);
  Object.defineProperties(stamp, specDesc.staticPropertyDescriptors || {});

  stamp.compose = assign(compose.bind(stamp), specDesc);

  return stamp;
}
