import forEach from 'lodash/collection/forEach';
import test from 'tape';

import { wrapMethods } from '../src/utils';

const methods = {
  componentDidMount: 'wrap',
  componentDidUpdate: 'wrap',
  componentWillMount: 'wrap',
  componentWillReceiveProps: 'wrap',
  componentWillUnmount: 'wrap',
  componentWillUpdate: 'wrap',
  getChildContext: 'wrap_merge',
  shouldComponentUpdate: 'wrap_or',
  render: 'override',
  nonReactMethod: 'override',
};


let targ = {}, src = {}, fail = {};
forEach(methods, (type, method) => {
  if (type === 'wrap_merge') {
    targ[method] = () => ({ foo: true, bar: false });
    src[method] = () => ({ bar: true });
  } else if (type == 'wrap_or') {
    targ[method] = () => false;
    src[method] = () => true;
  } else {
    targ[method] = function() {
      this.result = [ 'foo' ];
    };
    src[method] = function() {
      this.result.push('bar');
    };
  }
});

test('wrapMethods(targ, src)', (t) => {
  t.plan(10);

  const obj = wrapMethods(targ, src);

  forEach(methods, (type, method) => {
    obj.result = [];

    if (type === 'wrap') {
      obj[method]();

      t.deepEqual(
        obj.result, [ 'foo', 'bar' ],
        `should wrap '${method}'`
      );
    } else if (type === 'wrap_merge') {
      t.deepEqual(
        obj[method](), { foo: true, bar: true },
        `should wrap and merge '${method}'`
      );
    } else if (type === 'wrap_or') {
      t.ok(
        obj[method](),
        `should wrap and OR '${method}'`
      );
    } else if (type === 'override') {
      obj[method]();

      t.deepEqual(
        obj.result, [ 'bar' ],
        `should override '${method}'`
      );
    }
  });
});
