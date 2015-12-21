import { compose } from './utils';

/**
 * Convert the React component constructor function to a stamp.
 *
 * (React?: Object) => Stamp
 */
export default function reactStamp (React) {
  const desc = {};

  if (React && React.Component) {
    desc.methods = { ...React.Component.prototype };
    desc.initializers = [
      (options, { instance, args }) =>
        React.Component.call(instance, options, ...args),
    ];
  }

  return compose(desc);
}
