import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

/**
 * React specification for creating new components
 */
const reactSpec = {
  componentDidMount: 'wrap',
  componentDidUpdate: 'wrap',
  componentWillMount: 'wrap',
  componentWillReceiveProps: 'wrap',
  componentWillUnmount: 'wrap',
  componentWillUpdate: 'wrap',
  getChildContext: 'wrap_merge',
  render: 'override',
  shouldComponentUpdate: 'override',
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
export default function wrapMethods(targ = {}, src = {}) {
  const methods = mapValues(src, (val, key) => {
    switch (reactSpec[key]) {
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
      case 'override':
      default:
        return val;
    }
  });

  return assign({ ...targ }, methods);
}
