import isFunction from 'lodash/lang/isFunction';
import isObject from 'lodash/lang/isObject';

/**
 * [isComposable description]
 *
 * @param  {[type]} obj [description]
 *
 * @return {Boolean} [description]
 */
export function isComposable(obj) {
  return isFunction(obj) && isFunction(obj.compose);
}

/**
 * [isDescriptor description]
 *
 * @param  {[type]} obj [description]
 *
 * @return {Boolean} [description]
 */
export function isDescriptor(obj) {
  return isObject(obj);
}

/**
 * [isSpecDescriptor description]
 *
 * @param  {[type]} desc [description]
 *
 * @return {Boolean} [description]
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
