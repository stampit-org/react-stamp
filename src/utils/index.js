import * as cache from './cache';
import compose from './compose';
import stamp from './decorator';
import { initDescriptor, getReactDescriptor, parseDesc } from './descriptor';
import { dupeFilter, wrapMethods, extractStatics } from './react';
import { isSpecDescriptor } from './type';

export {
  cache,
  compose,
  stamp,
  initDescriptor,
  getReactDescriptor,
  parseDesc,
  dupeFilter,
  wrapMethods,
  extractStatics,
  isSpecDescriptor,
};
