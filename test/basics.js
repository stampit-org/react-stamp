import React from 'react/addons';
import test from 'tape';

import reactStamp from '../src';

const TestUtils = React.addons.TestUtils;

test('reactStamp()', (t) => {
  t.plan(1);

  t.ok(
    reactStamp().compose,
    'should return a stamp'
  );
});

test('reactStamp(React, desc)', (t) => {
  t.plan(1);

  t.ok(
    reactStamp(React, {}).compose,
    'should return a stamp'
  );
});

test('reactStamp(React)', (t) => {
  t.plan(1);

  t.ok(
    reactStamp(React).compose,
    'should return a stamp'
  );
});

test('reactStamp(null, desc)', (t) => {
  t.plan(1);

  t.ok(
    reactStamp(null, {}).compose,
    'should return a stamp'
  );
});

test('reactStamp(React, { render() })()', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {
    render() {},
  });

  t.ok(
    TestUtils.isCompositeComponent(stamp()),
    'should return a React component'
  );
});

test('reactStamp(React, desc).compose', (t) => {
  t.plan(1);

  t.equal(
    typeof reactStamp(React).compose, 'function',
    'should be a function'
  );
});
