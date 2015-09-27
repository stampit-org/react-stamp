import assign from 'lodash/object/assign';
import isEmpty from 'lodash/lang/isEmpty';

import { isSpecDescriptor } from './type';

/**
 * Initialize descriptor with property defaults.
 *
 * @return {Object} Default desriptor.
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
 * @param  {Class} Component The React component class.
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
 * [parseDesc description]
 *
 * @param  {Object} desc [description]
 *
 * @return {[type]} [description]
 */
export function parseDesc(desc = {}) {
  if (isSpecDescriptor(desc) || isEmpty(desc)) return desc;

  let {
    displayName, init, state, statics,
    contextTypes, childContextTypes, propTypes, defaultProps,
    ...methods,
  } = desc;
  let parsedDesc = initDescriptor();

  if (!displayName) displayName = 'ReactStamp';
  if (init) parsedDesc.initializers.push(init);
  if (state) parsedDesc.deepProperties.state = state;
  if (methods) assign(parsedDesc.methods, methods);

  parsedDesc.staticProperties = { ...statics, displayName };
  if (contextTypes) parsedDesc.staticProperties.contextTypes = contextTypes;
  if (childContextTypes) parsedDesc.staticProperties.childContextTypes = childContextTypes;
  if (propTypes) parsedDesc.staticProperties.propTypes = propTypes;
  if (defaultProps) parsedDesc.staticProperties.defaultProps = defaultProps;

  return parsedDesc;
}

