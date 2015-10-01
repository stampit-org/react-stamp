import React from 'react';
import test from 'tape';

import reactStamp from '../src';

test('reactStamp(React, { method() {} })()', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    render() {},
  });

  t.equal(
    typeof Object.getPrototypeOf(stamp()).render, 'function',
    'should return an instance with `method` as internal proto prop'
  );
});
