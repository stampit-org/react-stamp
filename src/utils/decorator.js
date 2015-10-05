import assign from 'lodash/object/assign';
import merge from 'lodash/object/merge';

import reactStamp from '..';

/**
 * Get the non-enum properties of an object.
 *
 * @param  {Object} src An object.
 *
 * @return {Object} An object of enum properties.
 */
function getNonEnum(src) {
  let obj = {};
  const props = Object.getOwnPropertyNames(src),
      enumOnly = Object.keys(src);

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
  let obj = {};
  const props = Object.keys(src);

  props.forEach(function(key) {
    obj[key] = src[key];
  });

  return obj;
}

/**
 * ES7 decorator for converting an ES6 class to a stamp.
 *
 * @param  {Function} Class An ES6 class.
 *
 * @return {Function} A stamp.
 */
export default function stamp(Class) {
  const desc = {};

  desc.initializers = [
    (options, { instance, args }) =>
      assign(instance, new Class(options, ...args)),
  ];

  desc.methods = assign({},
    Object.getPrototypeOf(Class).prototype,
    getNonEnum(Class.prototype)
  )

  return reactStamp(null, desc);
}
