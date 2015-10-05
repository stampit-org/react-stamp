import assign from 'lodash/object/assign';
import forEach from 'lodash/collection/forEach';
import merge from 'lodash/object/merge';

import reactStamp from '..';
import {
  parseDesc,
  wrapMethods,
} from '.';

/**
 * Take any number of stamps or descriptors. Return a new stamp
 * that encapsulates combined behavior. If nothing is passed in,
 * it returns an empty stamp.
 *
 * @param  {...Object} args Stamps and/or descriptors.
 *
 * @return {Function} A new stamp composed from arguments.
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

    // React spec
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

  return reactStamp(null, compDesc);
}
