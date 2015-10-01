import has from 'lodash/object/has';
import React from 'react';
import test from 'tape';

import reactStamp from '../src';

test('reactStamp(React, { state: obj })()', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    state: {
      foo: '',
    },
  });

  t.ok(
    has(stamp().state, 'foo'),
    'should return an instance with `state` prop'
  );
});

test('reactStamp(React, { init() { ... } })()', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    init() {
      this.state = { foo: '' };
    },
  });

  t.ok(
    has(stamp().state, 'foo'),
    'should return an instance with `state` prop'
  );
});
