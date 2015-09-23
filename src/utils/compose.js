import assign from 'lodash/object/assign';
import forEach from 'lodash/collection/forEach';
import merge from 'lodash/object/merge';

import createStamp from '..';
import {
  initDescriptor,
  parseDesc,
  isComposable,
  isDescriptor,
  dupeFilter,
  wrapMethods,
  extractStatics,
} from '.';

export default function compose (...args) {
  const compDesc = initDescriptor();
  const descs = args.map(arg => {
    if (isComposable(arg)) return arg.compose;
    else if (isDescriptor(arg)) return parseDesc(arg);
  });

  if (isComposable(this)) {
    /*
     * Speical handling is required for statics when using
     * the ES7 stamp decorator... worth it?
     */
    const { compose, ...statics } = this;
    compose.staticProperties = assign(compose.staticProperties || {}, statics);
    descs.unshift(compose);
  }

  forEach(descs, desc => {
    // state is handled special for React
    const { state, ...properties } = desc.properties;

    if (state) {
      compDesc.properties.state = assign(compDesc.properties.state || {}, state, dupeFilter);
    }
    compDesc.methods = wrapMethods(compDesc.methods, desc.methods);
    compDesc.staticProperties = extractStatics(compDesc.staticProperties, desc.staticProperties);

    assign(compDesc.properties, properties);
    merge(compDesc.deepProperties, desc.deepProperties);
    compDesc.initializers = compDesc.initializers.concat(desc.initializers);
    merge(compDesc.deepStaticProperties, desc.deepStaticProperties);
    assign(compDesc.propertyDescriptors, desc.propertyDescriptors);
    assign(compDesc.staticPropertyDescriptors, desc.staticPropertyDescriptors);
    merge(compDesc.configuration, desc.configuration);
  });

  return createStamp(null, compDesc);
}
