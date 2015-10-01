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

test('reactStamp(React, props)', (t) => {
  t.plan(1);

  const stamp = reactStamp(React, {});

  t.ok(
    stamp.compose,
    'should return a stamp'
  );
});

test('reactStamp(React)', (t) => {
  t.plan(1);

  const stamp = reactStamp(React);

  t.ok(
    stamp.compose,
    'should return a stamp'
  );
});

test('reactStamp(null, props)', (t) => {
  t.plan(1);

  const stamp = reactStamp(null, {});

  t.ok(
    stamp.compose,
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

test('reactStamp(React, props).compose', (t) => {
  t.plan(1);

  t.equal(
    typeof reactStamp(React).compose, 'function',
    'should be a function'
  );
});
