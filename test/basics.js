import React from 'react';
import test from 'tape';
import { isCompositeComponent } from 'react-addons-test-utils';

import reactStamp from '../src';

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
    isCompositeComponent(stamp()),
    'should return a React component'
  );
});
