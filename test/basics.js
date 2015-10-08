import React from 'react/addons';
import test from 'tape';

import reactStamp from '../src';

const TestUtils = React.addons.TestUtils;

test('reactStamp()', (t) => {
  t.plan(1);

  t.ok(
    reactStamp(React).compose,
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

test('reactStamp(React).compose', (t) => {
  t.plan(1);

  t.equal(
    typeof reactStamp(React).compose, 'function',
    'should be a function'
  );
});

test('reactStamp(React).compose({ render() })()', (t) => {
  t.plan(1);

  const stamp = reactStamp(React).compose({
    render () {},
  });

  t.ok(
    TestUtils.isCompositeComponent(stamp()),
    'should return a React component'
  );
});
