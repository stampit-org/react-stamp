import has from 'lodash/object/has';
import React from 'react';
import test from 'tape';

import reactStamp from '../src';

test('reactStamp(React, { statics: obj })', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    statics: {
      foo: '',
    },
  });

  t.ok(
    has(stamp, 'foo'),
    'should return a stamp with `statics` props as props'
  );
});

test('reactStamp(React, { displayName: str })', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    displayName: 'stamp',
  });

  t.ok(
    has(stamp, 'displayName'),
    'should return a stamp with `displayName` prop'
  );
});

test('reactStamp(React, { contextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    contextTypes: {},
  });

  t.ok(
    has(stamp, 'contextTypes'),
    'should return a stamp with `contextTypes` prop'
  );
});

test('reactStamp(React, { childContextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    childContextTypes: {},
  });

  t.ok(
    has(stamp, 'childContextTypes'),
    'should return a stamp with `childContextTypes` prop'
  );
});

test('reactStamp(React, { propTypes: obj })', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    propTypes: {},
  });

  t.ok(
    has(stamp, 'propTypes'),
    'should return a stamp with `propTypes` prop'
  );
});

test('reactStamp(React, { defaultProps: obj })', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    defaultProps: {},
  });

  t.ok(
    has(stamp, 'defaultProps'),
    'should return a stamp with `defaultProps` prop'
  );
});
