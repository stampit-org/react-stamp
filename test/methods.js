import React from 'react';
import test from 'tape';

import { compose } from '../src/utils';

test('compose({ method() {} })()', (t) => {
  t.plan(1);

  const stamp = compose({
    render() {},
  });

  t.equal(
    typeof Object.getPrototypeOf(stamp()).render, 'function',
    'should return an instance with `method` as internal proto prop'
  );
});
