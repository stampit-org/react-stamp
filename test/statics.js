import has from 'lodash/object/has';
import React from 'react';
import test from 'tape';

import stampit from '../src';

test('stampit(React, { statics: obj })', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    statics: {
      foo: '',
    },
  });

  t.ok(
    has(stamp, 'foo'),
    'should return a stamp with `statics` props as props'
  );
});

test('stampit(React, { displayName: str })', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    displayName: 'stamp',
  });

  t.ok(
    has(stamp, 'displayName'),
    'should return a stamp with `displayName` prop'
  );
});

test('stampit(React, { contextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    contextTypes: {},
  });

  t.ok(
    has(stamp, 'contextTypes'),
    'should return a stamp with `contextTypes` prop'
  );
});

test('stampit(React, { childContextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    childContextTypes: {},
  });

  t.ok(
    has(stamp, 'childContextTypes'),
    'should return a stamp with `childContextTypes` prop'
  );
});

test('stampit(React, { propTypes: obj })', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    propTypes: {},
  });

  t.ok(
    has(stamp, 'propTypes'),
    'should return a stamp with `propTypes` prop'
  );
});

test('stampit(React, { defaultProps: obj })', (t) => {
  t.plan(1);

  const stamp = stampit(React, {
    defaultProps: {},
  });

  t.ok(
    has(stamp, 'defaultProps'),
    'should return a stamp with `defaultProps` prop'
  );
});
