import test from 'tape';

import { compose } from '../src/utils';

test('compose({ statics: obj })', (t) => {
  t.plan(1);

  const stamp = compose({
    statics: {
      foo: true,
    },
  });

  t.ok(
    stamp.foo,
    'should return a stamp with `statics` props as props'
  );
});

test('compose({ displayName: str })', (t) => {
  t.plan(1);

  const stamp = compose({
    displayName: 'stamp',
  });

  t.ok(
    stamp.displayName,
    'should return a stamp with `displayName` prop'
  );
});

test('compose({ contextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = compose({
    contextTypes: {},
  });

  t.ok(
    stamp.contextTypes,
    'should return a stamp with `contextTypes` prop'
  );
});

test('compose({ childContextTypes: obj })', (t) => {
  t.plan(1);

  const stamp = compose({
    childContextTypes: {},
  });

  t.ok(
    stamp.childContextTypes,
    'should return a stamp with `childContextTypes` prop'
  );
});

test('compose({ propTypes: obj })', (t) => {
  t.plan(1);

  const stamp = compose({
    propTypes: {},
  });

  t.ok(
    stamp.propTypes,
    'should return a stamp with `propTypes` prop'
  );
});

test('compose({ defaultProps: obj })', (t) => {
  t.plan(1);

  const stamp = compose({
    defaultProps: {},
  });

  t.ok(
    stamp.defaultProps,
    'should return a stamp with `defaultProps` prop'
  );
});
