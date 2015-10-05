import assign from 'lodash/object/assign';
import forEach from 'lodash/collection/forEach';
import isEmpty from 'lodash/lang/isEmpty';

import { isSpecDescriptor } from '.';

/**
 * Convert the React component constructor function to a descriptor.
 *
 * @param  {Function} Component The React component constructor function.
 *
 * @return {Object} The React component descriptor.
 */
export function getReactDescriptor(Component) {
  const desc = {};

  if (Component) {
    desc.methods = { ...Component.prototype };
    desc.initializers = [
      (options, { instance, args }) =>
        Component.call(instance, options, ...args),
    ];
  }

  return desc;
};

/**
 * Verify a description object is compliant
 * to the stamp specification.
 *
 * @param  {Object} desc A description object.
 *
 * @return {Object} A stamp spec compliant description object.
 */
export function parseDesc(desc = {}) {
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

