import assign from 'lodash/object/assign';
import forEach from 'lodash/collection/forEach';
import merge from 'lodash/object/merge';

import createStamp from '..';
import {
  initDescriptor,
  parseDesc,
  dupeFilter,
  wrapMethods,
  extractStatics,
} from '.';

/**
 * Take any number of stamps or descriptors. Return a new stamp
 * that encapsulates combined behavior. If nothing is passed in,
 * it returns an empty stamp.
 *
 * @param  {...Object} args Stamps and/or descriptors.
 *
 * @return {Object} A new stamp composed from arguments.
 */
export default function compose(...args) {
  const compDesc = initDescriptor();
  const descs = args.map(arg => {
    return arg.compose || parseDesc(arg);
  });

  if (this && this.compose) {
    /**
     * Speical handling is required for statics when using
     * the ES7 stamp decorator... worth it?
     */
    const { compose, ...statics } = this;
    compose.staticProperties = assign(compose.staticProperties || {}, statics);
    descs.unshift(compose);
  }

  forEach(descs, desc => {
    /**
     * State is handled special for React
     */
    const { state, ...deepProperties } = desc.deepProperties || {};

    state && (compDesc.deepProperties.state = assign(compDesc.deepProperties.state || {}, state, dupeFilter));
    compDesc.methods = wrapMethods(compDesc.methods, desc.methods);
    compDesc.staticProperties = extractStatics(compDesc.staticProperties, desc.staticProperties);

    compDesc.initializers = compDesc.initializers.concat(desc.initializers)
      .filter(initializer => initializer !== undefined);
    merge(compDesc.deepProperties, deepProperties);
    assign(compDesc.properties, desc.properties);
    merge(compDesc.deepStaticProperties, desc.deepStaticProperties);
    assign(compDesc.propertyDescriptors, desc.propertyDescriptors);
    assign(compDesc.staticPropertyDescriptors, desc.staticPropertyDescriptors);
    merge(compDesc.configuration, desc.configuration);
  });

  return createStamp(null, compDesc);
}
