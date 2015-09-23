import assign from 'lodash/object/assign';
import merge from 'lodash/object/merge';

import createStamp, { compose } from '../';
import { initDescriptor } from './';

/**
 * Get object of non-enum properties
 */
function getNonEnum(target) {
  const props = Object.getOwnPropertyNames(target);
  const enumOnly = Object.keys(target);
  let obj = {};

  props.forEach(function(key) {
    var indexInEnum = enumOnly.indexOf(key);
    if (indexInEnum === -1 && key !== 'constructor') {
      obj[key] = target[key];
    }
  });

  return obj;
}

/**
 * Get object of enum properties
 */
function getEnum(target) {
  const props = Object.keys(target);
  let obj = {};

  props.forEach(function(key) {
    obj[key] = target[key];
  });

  return obj;
}

/**
 * ES7 decorator for converting ES6 class to stamp
 */
export default function stamp(Class) {
  const desc = initDescriptor();

  desc.initializers.push(
    function() {
      merge(this, new Class());
    }
  );

  assign(
    desc.methods,
    Object.getPrototypeOf(Class).prototype,
    getNonEnum(Class.prototype)
  );

  return createStamp(null, desc);
}
