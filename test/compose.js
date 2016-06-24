import test from 'tape';

import { compose } from '../src/utils';

test('composing objects with state', (t) => {
  t.plan(1);

  const obj1 = {
    state: {
      foo: true,
      bar: false,
    },
  };

  const obj2 = {
    state: {
      bar: true,
    },
  };

  const stamp = compose(obj1, obj2);

  t.deepEqual(
     stamp().state, { foo: true, bar: true },
    'should merge state'
  );
});

test('composing objects with React statics', (t) => {
  t.plan(4);

  const obj1 = {
    contextTypes: {
      foo: true,
      bar: false,
    },
    childContextTypes: {
      foo: true,
      bar: false,
    },
    propTypes: {
      foo: true,
      bar: false,
    },
    defaultProps: {
      foo: true,
      bar: false,
    },
  };

  const obj2 = {
    contextTypes: {
      bar: true,
    },
    childContextTypes: {
      bar: true,
    },
    propTypes: {
      bar: true,
    },
    defaultProps: {
      bar: true,
    },
  };

  const stamp = compose(obj1, obj2);

  t.deepEqual(
    stamp.contextTypes, { foo: true, bar: true },
    'should merge `contextTypes` props'
  );

  t.deepEqual(
    stamp.childContextTypes, { foo: true, bar: true },
    'should merge `childContextTypes` props'
  );

  t.deepEqual(
    stamp.propTypes, { foo: true, bar: true },
    'should merge `propTypes` props'
  );

  t.deepEqual(
    stamp.defaultProps, { foo: true, bar: true },
    'should merge `defaultProps` props'
  );
});

test('composing objects with non-React statics', (t) => {
  t.plan(2);

  const obj1 = {
    statics: {
      obj: {
        foo: true,
        bar: false,
      },
      method () {
        return false;
      },
    },
  };

  const obj2 = {
    statics: {
      obj: {
        bar: true,
      },
      method () {
        return true;
      },
    },
  };

  const stamp = compose(obj1, obj2);

  t.deepEqual(
    stamp.obj, { foo: true, bar: true },
    'should merge static objects'
  );

  t.ok(
    stamp.method(),
    'should inherit static methods overriding with last-in priority'
  );
});

test('composing objects with methods', (t) => {
  t.plan(5);

  const obj1 = {
    state: {
      stamp: false,
      mixin: false,
    },

    getChildContext () {
      return {
        foo: true,
        bar: false,
      };
    },

    componentDidMount () {
      this.state.stamp = true;
    },

    shouldComponentUpdate () {
      return true;
    },

    render () {
      return false;
    },
  };

  const obj2 = {
    getChildContext () {
      return {
        bar: true,
      };
    },

    componentDidMount () {
      this.state.mixin = true;
    },

    shouldComponentUpdate () {
      return false;
    },

    render () {
      return true;
    },
  };

  const stamp = compose(obj1, obj2);

  t.ok(
    typeof stamp.prototype.render === 'function',
    'should attach render() to stamp prototype'
  );

  const instance = stamp();
  instance.componentDidMount();

  t.deepEqual(
    instance.state, { stamp: true, mixin: true },
    'should sequentially run `wrap` methods'
  );

  t.deepEqual(
    instance.getChildContext(), { foo: true, bar: true },
    'should merge results of `wrap_merge` methods'
  );

  t.ok(
    instance.shouldComponentUpdate(),
    'should OR results of `wrap_or` methods'
  );

  t.ok(
    instance.render(),
    'should override `override` methods'
  );
});

test('compose', (t) => {
  t.plan(3);

  const obj1 = {
    displayName: 'obj1',
  };

  const obj2 = {
    displayName: 'obj2',
  };

  t.equal(
    compose(obj1, {}).displayName, obj1.displayName,
    'should ignore undefined `displayName` prop'
  );

  t.equal(
    compose(obj1, obj2).displayName, obj2.displayName,
    'should override defined `displayName` props'
  );

  t.equal(
    compose({}).displayName, 'Component',
    'should set undefined `displayName` prop to \'Component\''
  );
});
