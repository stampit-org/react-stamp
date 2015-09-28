/**
 * Check if descriptor object is stamp
 * spec compliant.
 *
 * @param  {Object} desc A decriptor object.
 *
 * @return {Boolean}
 */
export function isSpecDescriptor(desc) {
  return (
    desc.methods ||
    desc.properties ||
    desc.deepProperties ||
    desc.initializers ||
    desc.staticProperties ||
    desc.deepStaticProperties ||
    desc.propertyDescriptors ||
    desc.staticPropertyDescriptors ||
    desc.configuration
  );
}
