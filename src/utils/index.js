import * as cache from './cache';
import compose from './compose';
import stamp from './decorator';
import { initDescriptor, getReactDescriptor, parseDesc } from './descriptor';
import { dupeFilter, wrapMethods, extractStatics } from './react';
import { isComposable, isDescriptor, isSpecDescriptor } from './type';

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
  isComposable,
  isDescriptor,
  isSpecDescriptor,
};
