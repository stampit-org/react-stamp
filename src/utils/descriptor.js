import forEach from 'lodash/collection/forEach';
import isEmpty from 'lodash/lang/isEmpty';

/**
 * Check if object is stamp spec compliant.
 *
 * (desc?: reactDesc || specDesc): isSpec: boolean
 */
function isSpecDescriptor(desc = {}) {
  return (
    desc.methods ||
    desc.properties ||
    desc.deepProperties ||
    desc.initializers ||
    desc.staticProperties ||
    desc.deepStaticProperties ||
    desc.propertyDescriptors ||
    desc.staticPropertyDescriptors ||
    desc.configuration
  );
}

/**
 * Create a stamp spec compliant desc object.
 *
 * (desc?: reactDesc || specDesc): specDesc
 */
export default function parseDesc(desc = {}) {
  if (isSpecDescriptor(desc) || isEmpty(desc)) return desc;

  let {
    displayName, init, state, statics,
    contextTypes, childContextTypes, propTypes, defaultProps,
    ...methods,
  } = desc;
  const parsedDesc = {};

  !displayName && (displayName = 'ReactStamp');
  init && (parsedDesc.initializers = [ init ]);
  state && (parsedDesc.deepProperties = { state });
  methods && (parsedDesc.methods = methods);
  parsedDesc.deepStaticProperties = { ...statics, displayName };

  forEach({ contextTypes, childContextTypes, propTypes, defaultProps },
    (val, key) => val && (parsedDesc.deepStaticProperties[key] = val)
  );

  return parsedDesc;
}

