import uniqueId from 'lodash/utility/uniqueId';

let cache = {};

export function find(id) {
  return cache[id];
}

export function save(val, id) {
  if (id) cache[id] = val;

  return val;
}

export { uniqueId };
