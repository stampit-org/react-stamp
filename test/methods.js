import React from 'react';
import test from 'tape';

import stampit from '../src';

test('stampit(React, { method() {} })()', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    render() {},
  });

  t.equal(
    typeof Object.getPrototypeOf(stamp()).render, 'function',
    'should return an instance with `method` as internal proto prop'
  );
});
