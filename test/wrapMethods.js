import test from 'tape';

import { wrapMethods } from '../src/utils';

test('wrapMethods(targ, src)', (t) => {
  t.plan(7);

  /* eslint-disable brace-style */
  const targ = {
    componentWillMount() { this.wrapped = false; },
    componentDidMount() { this.wrapped = false; },
    componentWillReceiveProps() { this.wrapped = false; },
    componentWillUpdate() { this.wrapped = false; },
    componentDidUpdate() { this.wrapped = false; },
    componentWillUnmount() { this.wrapped = false; },
    method() {},
  };

  const src = {
    componentWillMount() { this.wrapped = 'WillMount'; },
    componentDidMount() { this.wrapped = 'DidMount'; },
    componentWillReceiveProps() { this.wrapped = 'WillReceiveProps'; },
    componentWillUpdate() { this.wrapped = 'WillUpdate'; },
    componentDidUpdate() { this.wrapped = 'DidUpdate'; },
    componentWillUnmount() { this.wrapped = 'WillUnmount'; },
  };

  const failObj = {
    method() {},
  };
  /* eslint-enable brace-style */

  const obj = wrapMethods(targ, src);

  obj.componentWillMount();
  t.equal(
    obj.wrapped, 'WillMount',
    'should wrap `componentWillMount`'
  );

  obj.componentDidMount();
  t.equal(
    obj.wrapped, 'DidMount',
    'should wrap `componentDidMount`'
  );

  obj.componentWillReceiveProps();
  t.equal(
    obj.wrapped, 'WillReceiveProps',
    'should wrap `componentWillReceiveProps`'
  );

  obj.componentWillUpdate();
  t.equal(
    obj.wrapped, 'WillUpdate',
    'should wrap `componentWillUpdate`'
  );

  obj.componentDidUpdate();
  t.equal(
    obj.wrapped, 'DidUpdate',
    'should wrap `componentDidUpdate`'
  );

  obj.componentWillUnmount();
  t.ok(
    obj.wrapped, 'WillUnmount',
    'should wrap `componentWillUnmount`'
  );

  t.throws(
    () => wrapMethods(targ, failObj), TypeError,
    'should throw on dupe non-React method'
  );
});
