import assign from 'lodash/object/assign';
import isEmpty from 'lodash/lang/isEmpty';

import { isSpecDescriptor } from '.';

/**
 * Initialize descriptor with property defaults.
 *
 * @return {Object} Default descriptor.
 */
export function initDescriptor() {
  return {
    methods: {},
    properties: {},
    deepProperties: {},
    initializers: [],
    staticProperties: {},
    deepStaticProperties: {},
    propertyDescriptors: {},
    staticPropertyDescriptors: {},
    configuration: {},
  };
};

/**
 * Convert React component class to descriptor.
 *
 * @param  {Object} Component The React component class.
 *
 * @return {Object} The React component descriptor.
 */
export function getReactDescriptor(Component) {
  const desc = initDescriptor();

  if (Component) {
    desc.methods = { ...Component.prototype };
    desc.initializers.push(
      (args, { instance, stamp }) => Component.apply(instance, args)
    );
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
  let parsedDesc = initDescriptor();

  !displayName && (displayName = 'ReactStamp');
  init && parsedDesc.initializers.push(init);
  state && (parsedDesc.deepProperties.state = state);
  methods && assign(parsedDesc.methods, methods);

  parsedDesc.staticProperties = { ...statics, displayName };
  contextTypes && (parsedDesc.staticProperties.contextTypes = contextTypes);
  childContextTypes && (parsedDesc.staticProperties.childContextTypes = childContextTypes);
  propTypes && (parsedDesc.staticProperties.propTypes = propTypes);
  defaultProps && (parsedDesc.staticProperties.defaultProps = defaultProps);

  return parsedDesc;
}

