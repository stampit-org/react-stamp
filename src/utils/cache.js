import uniqueId from 'lodash/utility/uniqueId';

let cache = {};

/**
 * [find description]
 *
 * @param  {[type]} id [description]
 *
 * @return {[type]} [description]
 */
export function find(id) {
  return cache[id];
}

/**
 * [save description]
 *
 * @param  {[type]} val [description]
 * @param  {[type]} id [description]
 *
 * @return {[type]} [description]
 */
export function save(val, id) {
  if (id) cache[id] = val;

  return val;
}

export { uniqueId };
