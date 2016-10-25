import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import { isDescriptor, isStamp } from 'stamp-utils';

const descriptorNames = [ 'methods', 'properties', 'deepProperties', 'propertyDescriptors', 'staticProperties', 'deepStaticProperties', 'staticPropertyDescriptors', 'initializers', 'configuration' ];

export function isStampDescriptor (desc) {
  if (isDescriptor(desc) && Object.keys(desc).some((name) => descriptorNames.includes(name))) {
    return true;
  } else if (isEmpty(desc)) {
    return true;
  }
  return false;
}

/**
 * Create a stamp spec compliant desc object.
 *
 * (desc?: Stamp | ReactDesc | SpecDesc) => SpecDesc
 */
export default function parseDesc (desc = {}) {
  if (isStamp(desc)) {
    return desc.compose;
  } else if (isStampDescriptor(desc)) {
    return desc;
  }

  let {
    displayName, init, state, statics,
    contextTypes, childContextTypes, propTypes, defaultProps,
    ...methods,
  } = desc;
  const parsedDesc = {};

  displayName && (parsedDesc.staticProperties = { displayName });
  init && (parsedDesc.initializers = [ init ]);
  state && (parsedDesc.deepProperties = { state });
  methods && (parsedDesc.methods = methods);
  parsedDesc.deepStaticProperties = { ...statics };

  forEach({ contextTypes, childContextTypes, propTypes, defaultProps },
    (val, key) => val && (parsedDesc.deepStaticProperties[key] = val)
  );

  return parsedDesc;
}

