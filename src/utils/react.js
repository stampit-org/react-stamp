import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

/**
 * React specification for creating new components
 */
const reactSpec = {
  render: 'once',
  componentWillMount: 'many',
  componentDidMount: 'many',
  componentWillReceiveProps: 'many',
  shouldComponentUpdate: 'once',
  componentWillUpdate: 'many',
  componentDidUpdate: 'many',
  componentWillUnmount: 'many',
  getChildContext: 'many_merged',
};

export function dupeFilter(prev, next, key, targ) {
  if (targ[key]) {
    throw new TypeError('Cannot mixin key `' + key + '` because it has a unique constraint.');
  }

  return next;
};

/**
 * Iterate through object methods, creating wrapper
 * functions for mixable React methods, starting
 * execution with first-in.
 *
 * @param  {Object} targ The target object.
 * @param  {Object} src The src object.
 *
 * @return {Object} The new object.
 */
export function wrapMethods(targ = {}, src = {}) {
  const methods = mapValues(src, (val, key) => {
    switch (reactSpec[key]) {
      case 'many':
        return function () {
          targ[key] && targ[key].apply(this, arguments);
          val.apply(this, arguments);
        };
      case 'many_merged':
        return function () {
          const res1 = targ[key] && targ[key].apply(this, arguments);
          const res2 = val.apply(this, arguments);

          return res1 ? assign(res1, res2) : res2;
        };
      case 'once':
        return dupeFilter(null, val, key, targ);
      default:
        return val;
    }
  });

  return assign({ ...targ }, methods);
}
