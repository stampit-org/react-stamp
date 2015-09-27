import has from 'lodash/object/has';
import React from 'react';
import test from 'tape';

import createStamp from '../src';

test('createStamp(React, { statics: obj })', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    statics: {
      foo: '',
    },
  });

  t.ok(
    has(stamp, 'foo'),
    'should return a stamp with `statics` props as props'
  );
});

test('createStamp(React, { displayName: str })', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    displayName: 'stamp',
  });

  t.ok(
    has(stamp, 'displayName'),
    'should return a stamp with `displayName` prop'
  );
});

test('createStamp(React, { contextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    contextTypes: {},
  });

  t.ok(
    has(stamp, 'contextTypes'),
    'should return a stamp with `contextTypes` prop'
  );
});

test('createStamp(React, { childContextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    childContextTypes: {},
  });

  t.ok(
    has(stamp, 'childContextTypes'),
    'should return a stamp with `childContextTypes` prop'
  );
});

test('createStamp(React, { propTypes: obj })', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    propTypes: {},
  });

  t.ok(
    has(stamp, 'propTypes'),
    'should return a stamp with `propTypes` prop'
  );
});

test('createStamp(React, { defaultProps: obj })', (t) => {
  t.plan(1);

  const stamp = createStamp(React, {
    defaultProps: {},
  });

  t.ok(
    has(stamp, 'defaultProps'),
    'should return a stamp with `defaultProps` prop'
  );
});
