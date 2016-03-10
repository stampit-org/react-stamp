import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';

/**
 * React lifecycle methods
 */
const lifecycle = {
  componentDidMount: 'wrap',
  componentDidUpdate: 'wrap',
  componentWillMount: 'wrap',
  componentWillReceiveProps: 'wrap',
  componentWillUnmount: 'wrap',
  componentWillUpdate: 'wrap',
  getChildContext: 'wrap_merge',
  render: 'override',
  shouldComponentUpdate: 'wrap_or',
};

/**
 * Iterate through object methods, creating wrapper
 * functions for React lifecycle methods, starting
 * execution with first-in.
 *
 * (targ?: Object, src?: Object) => new: Object
 */
export default function wrapMethods (targ = {}, src = {}) {
  const methods = mapValues(src, (val, key) => {
    switch (lifecycle[key]) {
      case 'wrap':
        return function () {
          targ[key] && targ[key].apply(this, arguments);
          val.apply(this, arguments);
        };
      case 'wrap_merge':
        return function () {
          const res1 = targ[key] && targ[key].apply(this, arguments);
          const res2 = val.apply(this, arguments);

          return res1 ? assign(res1, res2) : res2;
        };
      case 'wrap_or':
        return function () {
          const res1 = targ[key] && targ[key].apply(this, arguments);
          const res2 = val.apply(this, arguments);

          return res1 || res2;
        };
      case 'override':
      default:
        return val;
    }
  });

  return assign({ ...targ }, methods);
}
