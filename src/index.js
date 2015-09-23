import assign from 'lodash/object/assign';
import isEmpty from 'lodash/lang/isEmpty';
import isFunction from 'lodash/lang/isFunction';
import merge from 'lodash/object/merge';

import {
  compose,
  getReactDescriptor,
  parseDesc,
  dupeFilter,
} from './utils';

export default function createStamp(React, desc = {}) {
  let reactDesc = getReactDescriptor(React && React.Component);

  if (!isEmpty(desc)) reactDesc = parseDesc(desc, reactDesc);

  const stamp = (...args) => {
    const instance = Object.create(reactDesc.methods);
    /*
     * State is handled special for React
     */
    const { state, ...properties } = reactDesc.properties;

    reactDesc.initializers.forEach(initializer => {
      if (!isFunction(initializer)) return;

      initializer.apply(instance, [ args, { instance, stamp } ]);
    });

    if (state) {
      instance.state = assign(instance.state || {}, state, dupeFilter);
    }

    assign(instance, properties);
    merge(instance, reactDesc.deepProperties);
    Object.defineProperties(instance, reactDesc.propertyDescriptors);
    merge(instance, reactDesc.configuration);

    return instance;
  }

  assign(stamp, reactDesc.staticProperties);
  merge(stamp, reactDesc.deepStaticProperties);
  Object.defineProperties(stamp, reactDesc.staticPropertyDescriptors);

  stamp.compose = assign(compose.bind(stamp), reactDesc);

  return stamp;
}
