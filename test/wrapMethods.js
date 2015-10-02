import forEach from 'lodash/collection/forEach';
import isEqual from 'lodash/lang/isEqual';
import test from 'tape';

import { wrapMethods } from '../src/utils';

const methods = {
  render: 'once',
  shouldComponentUpdate: 'once',
  componentWillMount: 'many',
  componentDidMount: 'many',
  componentWillReceiveProps: 'many',
  componentWillUpdate: 'many',
  componentDidUpdate: 'many',
  componentWillUnmount: 'many',
  nonReactMethod: 'override',
};


let targ = {}, src = {}, fail = {};
forEach(methods, (type, method) => {
  targ[method] = function() {
    this.result = [ 'foo' ];
  };

  if (type !== 'once') {
    src[method] = function() {
      this.result.push('bar');
    };
  } else {
    fail[method] = { [method]() {} };
  }
});

test('wrapMethods(targ, src)', (t) => {
  t.plan(9);

  const obj = wrapMethods(targ, src);

  forEach(methods, (type, method) => {
    obj.result = [];
    obj[method]();

    if (type === 'many') {
      t.ok(
        isEqual(obj.result, [ 'foo', 'bar' ]),
        `should wrap dupe '${method}'`
      );
    } else if (type === 'override') {
      t.ok(
        isEqual(obj.result, [ 'bar' ]),
        `should override dupe '${method}'`
      );
    } else {
      t.throws(
        () => wrapMethods(targ, fail[method]), TypeError,
        `should throw on dupe '${method}'`
      );
    }
  });
});
