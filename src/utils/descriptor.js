import assign from 'lodash/object/assign';
import isEmpty from 'lodash/lang/isEmpty';

import { isSpecDescriptor } from './type';

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

export function getReactDescriptor(React) {
  const desc = initDescriptor();

  if (React) {
    desc.methods = React.prototype;
    desc.initializers.push(
      (args, { instance, stamp }) => React.apply(instance, args)
    );
  }

  return desc;
};

export function parseDesc(desc, targ = {}) {
  if (isSpecDescriptor(desc)) return desc;

  let {
    displayName, init, state, statics,
    contextTypes, childContextTypes, propTypes, defaultProps,
    ...methods,
  } = desc;
  let parsedDesc = !isEmpty(targ) ? { ...targ } : initDescriptor();

  if (!displayName) displayName = 'ReactStamp';
  if (init) parsedDesc.initializers.push(init);
  if (state) parsedDesc.properties.state = state;
  if (methods) assign(parsedDesc.methods, methods);

  parsedDesc.staticProperties = { ...statics, displayName };
  if (contextTypes) parsedDesc.staticProperties.contextTypes = contextTypes;
  if (childContextTypes) parsedDesc.staticProperties.childContextTypes = childContextTypes;
  if (propTypes) parsedDesc.staticProperties.propTypes = propTypes;
  if (defaultProps) parsedDesc.staticProperties.defaultProps = defaultProps;

  return parsedDesc;
}

