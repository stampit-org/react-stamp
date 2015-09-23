import isFunction from 'lodash/lang/isFunction';
import isObject from 'lodash/lang/isObject';

export function isComposable(obj) {
  return isFunction(obj) && isFunction(obj.compose);
}

export function isDescriptor(obj) {
  return isObject(obj);
}

/*
 * This could probably be improved
 */
export function isSpecDescriptor(desc) {
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
