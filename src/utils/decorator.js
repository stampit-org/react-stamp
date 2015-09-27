import assign from 'lodash/object/assign';
import merge from 'lodash/object/merge';

import createStamp, { compose } from '../';
import { initDescriptor } from './';

/**
 * Get the non-enum properties of an object.
 *
 * @param  {Object} src An object.
 *
 * @return {Object} An object of enum properties.
 */
function getNonEnum(src) {
  const props = Object.getOwnPropertyNames(src);
  const enumOnly = Object.keys(src);
  let obj = {};

  props.forEach(function(key) {
    var indexInEnum = enumOnly.indexOf(key);
    if (indexInEnum === -1 && key !== 'constructor') {
      obj[key] = src[key];
    }
  });

  return obj;
}

/**
 * Get the enum properties of an object.
 *
 * @param  {Object} src An object.
 *
 * @return {Object} An object of enum properties.
 */
function getEnum(src) {
  const props = Object.keys(src);
  let obj = {};

  props.forEach(function(key) {
    obj[key] = src[key];
  });

  return obj;
}

/**
 * ES7 decorator for converting an ES6 class to a stamp.
 *
 * @param  {Class} Class An ES6 class.
 *
 * @return {Function} A stamp.
 */
export default function stamp(Class) {
  const desc = {};
  const init = function() {
    merge(this, new Class());
  }

  desc.initializers = [ init ];
  desc.methods = assign({},
    Object.getPrototypeOf(Class).prototype,
    getNonEnum(Class.prototype)
  )

  return createStamp(null, desc);
}
