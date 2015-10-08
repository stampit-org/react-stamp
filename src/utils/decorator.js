import assign from 'lodash/object/assign';

import { compose } from '.';

/**
 * Get the non-enum properties of an object.
 *
 * (src: object): enums: object
 */
function getNonEnum (src) {
  let obj = {};
  const props = Object.getOwnPropertyNames(src),
      enumOnly = Object.keys(src);

  props.forEach(key => {
    const indexInEnum = enumOnly.indexOf(key);
    if (indexInEnum === -1 && key !== 'constructor') {
      obj[key] = src[key];
    }
  });

  return obj;
}

/**
 * ES7 decorator for converting an ES6 class to a stamp.
 *
 * (Class?: Function): stamp
 */
export default function stamp (Class) {
  const desc = {};

  desc.initializers = [
    (options, { instance, args }) =>
      assign(instance, new Class(options, ...args)),
  ];

  desc.methods = assign({},
    Object.getPrototypeOf(Class).prototype,
    getNonEnum(Class.prototype)
  );

  return compose(desc);
}
