import forEach from 'lodash/collection/forEach';
import isEmpty from 'lodash/lang/isEmpty';

/**
 * Check if descriptor object is stamp
 * spec compliant.
 *
 * @param  {Object} desc A decriptor object.
 *
 * @return {Boolean}
 */
function isSpecDescriptor(desc) {
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
 * Verify a description object is compliant
 * to the stamp specification.
 *
 * @param  {Object} desc A description object.
 *
 * @return {Object} A stamp spec compliant description object.
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

