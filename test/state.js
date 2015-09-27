import has from 'lodash/object/has';
import React from 'react';
import test from 'tape';

import createStamp from '../src';

test('createStamp(React, { state: obj })()', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    state: {
      foo: '',
    },
  });

  t.ok(
    has(stamp().state, 'foo'),
    'should return an instance with `state` prop'
  );
});

test('createStamp(React, { init() { ... } })()', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    init() {
      this.state = { foo: '' };
    },
  });

  t.ok(
    has(stamp().state, 'foo'),
    'should return an instance with `state` prop'
  );
});
