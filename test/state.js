import has from 'lodash/object/has';
import React from 'react';
import test from 'tape';

import stampit from '../src';

test('stampit(React, { state: obj })()', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    state: {
      foo: '',
    },
  });

  t.ok(
    has(stamp().state, 'foo'),
    'should return an instance with `state` prop'
  );
});

test('stampit(React, { init() { ... } })()', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    init() {
      this.state = { foo: '' };
    },
  });

  t.ok(
    has(stamp().state, 'foo'),
    'should return an instance with `state` prop'
  );
});
