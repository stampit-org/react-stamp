import forEach from 'lodash/collection/forEach';
import isEmpty from 'lodash/lang/isEmpty';
import { isDescriptor, isStamp } from 'stamp-utils';

/**
 * Create a stamp spec compliant desc object.
 *
 * (desc?: Stamp | ReactDesc | SpecDesc) => SpecDesc
 */
export default function parseDesc (desc = {}) {
  if (isStamp(desc)) {
    return desc.compose;
  } else if (isDescriptor(desc) || isEmpty(desc)) {
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

