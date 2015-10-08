import test from 'tape';

import { compose } from '../src/utils';

test('compose({ state: obj })()', (t) => {
  t.plan(1);

  const stamp = compose({
    state: {
      foo: true,
    },
  });

  t.ok(
    stamp().state.foo,
    'should return an instance with `state` prop'
  );
});

test('compose({ init() {} })()', (t) => {
  t.plan(1);

  const stamp = compose({
    init () {
      this.state = { foo: true };
    },
  });

  t.ok(
    stamp().state.foo,
    'should return an instance with `state` prop'
  );
});
