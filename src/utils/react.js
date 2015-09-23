import assign from 'lodash/object/assign';
import forEach from 'lodash/collection/forEach';
import isFunction from 'lodash/lang/isFunction';
import mapValues from 'lodash/object/mapValues';

/**
 * React specification for creating new components
 */
const reactSpec = {
  propTypes: 'many_merged_dupe',
  defaultProps: 'many_merged_dupe',
  contextTypes: 'many_merged',
  childContextTypes: 'many_merged',
  getChildContext: 'many_merged_dupe',
  render: 'once',
  componentWillMount: 'many',
  componentDidMount: 'many',
  componentWillReceiveProps: 'many',
  shouldComponentUpdate: 'once',
  componentWillUpdate: 'many',
  componentDidUpdate: 'many',
  componentWillUnmount: 'many',
};

export function dupeFilter(prev, next, key, targ) {
  if (targ[key]) {
    throw new TypeError('Cannot mixin key `' + key + '` because it is provided by multiple sources.');
  }

  return next;
};

/**
 * Iterate through stamp methods, creating wrapper
 * functions for mixable React methods, starting
 * execution with first-in.
 *
 * @param {Object} targ Method destination
 * @param {Object} src New methods
 * @return {Object} An object of methods
 */
export function wrapMethods(targ, src) {
  let methods;

  methods = mapValues(src, (val, key) => {
    if (!isFunction(val)) return false;

    switch (reactSpec[key]) {
      case 'many':
        return function () {
          /* eslint-disable no-unused-expressions */
          targ[key] && targ[key].apply(this, arguments);
          val.apply(this, arguments);
          /* eslint-disable no-unused-expressions */
        };
      case 'many_merged_dupe':
        return function () {
          const res1 = targ[key] && targ[key].apply(this, arguments);
          const res2 = val.apply(this, arguments);

          return res1 ? assign(res1, res2, dupeFilter) : res2;
        };
      case 'once':
      default:
        if (targ[key]) {
          throw new TypeError('Cannot mixin `' + key + '` because it has a unique constraint.');
        }

        return val;
    }
  });

  return assign({}, targ, methods);
}

/**
 * Process the static properties of a stamp and
 * combine the result with the passed in statics object.
 *
 * @param {Object} stamp A stamp
 * @param {Object} prev An object of past static properties
 * @return {Object} A processed object of static properties
 */
export function extractStatics(targ, src) {
  let statics = { ...targ };

  forEach(src, (val, key) => {
    if (reactSpec[key] === 'many_merged_dupe') {
      statics[key] = assign(statics[key] || {}, val, dupeFilter);
    } else if (reactSpec[key] === 'many_merged') {
      statics[key] = assign(statics[key] || {}, val);
    } else {
      statics[key] = val;
    }
  });

  return statics;
}
