import uniqueId from 'lodash/utility/uniqueId';

const cache = {};

/**
 * Find and return an object with matching id.
 *
 * @param  {Number} id The index of the object.
 *
 * @return {Object} The cached object.
 */
export function find(id) {
  return cache[id];
}

/**
 * Cache an object using the passed id as the index.
 *
 * @param  {Object} obj An object.
 * @param  {Number} id The object's key.
 *
 * @return {Object} The object.
 */
export function save(obj, id) {
  id && (cache[id] = obj);

  return obj;
}

export { uniqueId };
