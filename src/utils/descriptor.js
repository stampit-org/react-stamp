import forEach from 'lodash/forEach';
import has from 'lodash/has';

function isSpecDescriptor (obj) {
  const properties = [
    'methods',
    'properties',
    'deepProperties',
    'propertyDescriptors',
    'staticProperties',
    'staticDeepProperties',
    'staticPropertyDescriptors',
    'initializers',
    'configuration',
    'deepConfiguration'
  ];

  return properties.filter(property => has(obj, property)).length;
}

/**
 * Create a stamp spec compliant desc object.
 *
 * (desc?: ReactDesc | SpecDesc) => SpecDesc
 */
export default function parseDesc (desc = {}) {
  //console.log(desc);
  if (isSpecDescriptor(desc)) return desc;

  let {
    displayName, init, state, statics,
    contextTypes, childContextTypes, propTypes, defaultProps,
    ...methods,
  } = desc;
  const parsedDesc = {};

  //console.log(methods);

  displayName && (parsedDesc.staticProperties = { displayName });
  init && (parsedDesc.initializers = [ init ]);
  state && (parsedDesc.deepProperties = { state });
  methods && (parsedDesc.methods = methods);
  parsedDesc.staticDeepProperties = { ...statics };

  forEach({ contextTypes, childContextTypes, propTypes, defaultProps },
    (val, key) => val && (parsedDesc.staticDeepProperties[key] = val)
  );

  return parsedDesc;
}

