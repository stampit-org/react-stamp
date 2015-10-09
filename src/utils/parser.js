import forEach from 'lodash/collection/forEach';
import isFunction from 'lodash/lang/isFunction';

/**
 * Check if object is stamp spec compliant.
 *
 * (obj: object): isSpec: boolean
 */
function isSpecDescriptor (obj) {
  return (
    obj.methods ||
    obj.properties ||
    obj.deepProperties ||
    obj.initializers ||
    obj.staticProperties ||
    obj.deepStaticProperties ||
    obj.propertyDescriptors ||
    obj.staticPropertyDescriptors ||
    obj.configuration
  );
}

/**
 * Create a stamp spec compliant desc object.
 *
 * (obj: Function | reactDesc | specDesc): specDesc
 */
export default function parseObj (obj) {
  let desc = {};

  if (isSpecDescriptor(obj)) {
    desc = obj;
  } else if (isFunction(obj)) {
    // Support stateless functions
    desc.methods = {
      render () {
        return obj.call(this, this.props);
      },
    };
  } else {
    let {
      displayName, init, state, statics,
      contextTypes, childContextTypes, propTypes, defaultProps,
      ...methods,
    } = obj;

    !displayName && (displayName = 'ReactStamp');
    init && (desc.initializers = [ init ]);
    state && (desc.deepProperties = { state });
    methods && (desc.methods = methods);
    desc.deepStaticProperties = { ...statics, displayName };

    forEach({ contextTypes, childContextTypes, propTypes, defaultProps },
      (val, key) => val && (desc.deepStaticProperties[key] = val)
    );
  }

  return desc;
}

