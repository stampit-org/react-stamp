import assign from 'lodash/assign';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import mergeWith from 'lodash/mergeWith';
//import compose from 'stamp-specification';

import {
  parseDesc,
  wrapMethods,
} from './';

const isDescriptor = isObject;
const merge = (dst, src) => mergeWith(dst, src, (dstValue, srcValue) => {
  if (Array.isArray(dstValue)) {
    if (Array.isArray(srcValue)) return dstValue.concat(srcValue);
    if (isObject(srcValue)) return merge({}, srcValue);
  }

  return undefined;
});

/**
 * Given a description object, return a stamp aka composable.
 *
 * (desc?: SpecDesc) => Stamp
 */
function createStamp (specDesc = {}, composeFunction) {
  const Component = (options, ...args) => {
    let instance = Object.create(specDesc.methods || {});

    merge(instance, specDesc.deepProperties);
    assign(instance, specDesc.properties, specDesc.configuration);
    Object.defineProperties(instance, specDesc.propertyDescriptors || {});

    if (specDesc.initializers) {
      specDesc.initializers.forEach(initializer => {
        const result = initializer.call(instance, options,
          { instance, stamp: Component, args: [options].concat(args) });
        typeof result !== 'undefined' && (instance = result);
      });
    }

    return instance;
  };

  merge(Component, specDesc.staticDeepProperties);
  assign(Component, specDesc.staticProperties);
  Object.defineProperties(Component, specDesc.staticPropertyDescriptors || {});

  !Component.displayName && (Component.displayName = 'Component');

  const composeImplementation = isFunction(Component.compose) ? Component.compose : composeFunction;
  Component.compose = function () {
    return composeImplementation.apply(this, arguments);
  };
  assign(Component.compose, specDesc);

  return Component;
}

/**
 * Mutates the dstDescriptor by merging the srcComposable data into it.
 * @param {object} dstDescriptor The descriptor object to merge into.
 * @param {object} [srcComposable] The composable (either descriptor or stamp) to merge data form.
 * @returns {object} Returns the dstDescriptor argument.
 */
function mergeComposable (dstDescriptor, srcComposable) {
  const srcDescriptor = parseDesc(srcComposable && srcComposable.compose || srcComposable);
  if (!isDescriptor(srcDescriptor)) return dstDescriptor;

  const combineProperty = (propName, action) => {
    if (!isObject(srcDescriptor[propName])) return;
    if (!isObject(dstDescriptor[propName])) dstDescriptor[propName] = {};
    action(dstDescriptor[propName], srcDescriptor[propName]);
  };

  console.log(dstDescriptor.methods);
  combineProperty('methods', wrapMethods); // Wrap React lifecycle methods

  //console.log(dstDescriptor.methods);

  combineProperty('properties', assign);
  combineProperty('deepProperties', merge);
  combineProperty('propertyDescriptors', assign);
  combineProperty('staticProperties', assign);
  combineProperty('staticDeepProperties', merge);
  combineProperty('staticPropertyDescriptors', assign);
  combineProperty('configuration', assign);
  combineProperty('deepConfiguration', merge);
  if (Array.isArray(srcDescriptor.initializers)) {
    if (!Array.isArray(dstDescriptor.initializers)) dstDescriptor.initializers = [];
    dstDescriptor.initializers.push.apply(dstDescriptor.initializers, srcDescriptor.initializers.filter(isFunction));
  }

  //console.log(dstDescriptor);

  return dstDescriptor;
}

/**
 * Given the list of composables (stamp descriptors and stamps) returns a new stamp (composable factory function).
 * @param {...(object|Function)} [composables] The list of composables.
 * @returns {Function} A new stamp (aka composable factory function).
 */
export default function compose (...composables) {
  const descriptor = [this].concat(composables).filter(isObject).reduce(mergeComposable, {});
  //console.log(descriptor);
  return createStamp(descriptor, compose);
}
