import React from 'react';
import test from 'tape';

import reactStamp from '../src';
import { compose } from '../src/utils';

test('reactStamp(React, props).compose(stamp2)', (t) => {
  t.plan(1);

  const mixin = reactStamp(null, {
    method() {},
  });

  const stamp = reactStamp(React).compose(mixin);

  t.ok(
    stamp().method,
    'should return a stamp composed of `this` and passed stamp'
  );
});

test('reactStamp(React, props).compose(pojo)', (t) => {
  t.plan(1);

  const mixin = {
    method() {},
  };

  const stamp = reactStamp(React).compose(mixin);

  t.ok(
    stamp().method,
    'should return a stamp composed of `this` and passed pojo'
  );
});

test('reactStamp(React, props).compose(stamp2, stamp3)', (t) => {
  t.plan(2);

  const mixin1 = reactStamp(null, {
    method() {
      return this.state;
    },
  });

  const mixin2 = reactStamp(null, {
    statics: {
      util() {},
    },
  });

  const stamp = reactStamp(React, {
    state: {
      foo: true,
    },
  }).compose(mixin1, mixin2);

  t.ok(
    stamp().method().foo,
    'should expose `this` to inherited methods'
  );

  t.ok(
    stamp.util,
    'should inherit static methods'
  );
});

test('stamps composed of stamps with state', (t) => {
  t.plan(1);

  const mixin = reactStamp(null, {
    state: {
      bar: true,
    },
  });

  const stamp = reactStamp(React, {
    state: {
      foo: true,
      bar: false,
    },
  }).compose(mixin);

  t.deepEqual(
     stamp().state, { foo: true, bar: true },
    'should merge state'
  );
});

test('stamps composed of stamps with React statics', (t) => {
  t.plan(4);

  const mixin = reactStamp(null, {
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
  });

  const stamp = reactStamp(React, {
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
  }).compose(mixin);

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

test('stamps composed of stamps with non-React statics', (t) => {
  t.plan(2);

  const mixin = reactStamp(null, {
    statics: {
      obj: {
        bar: true,
      },
      method() {
        return true;
      },
    },
  });

  const stamp = reactStamp(React, {
    statics: {
      obj: {
        foo: true,
        bar: false,
      },
      method() {
        return false;
      },
    },
  }).compose(mixin);

  t.deepEqual(
    stamp.obj, { foo: true, bar: true },
    'should merge static objects'
  );

  t.ok(
    stamp.method(),
    'should inherit static methods overriding with last-in priority'
  );
});

test('stamps composed of stamps with methods', (t) => {
  t.plan(4);

  const mixin = reactStamp(null, {
    getChildContext() {
      return {
        bar: true,
      };
    },

    componentDidMount() {
      this.state.mixin = true;
    },

    shouldComponentUpdate() {
      return false;
    },

    render() {
      return true;
    },
  });

  const stamp = reactStamp(React, {
    state: {
      stamp: false,
      mixin: false,
    },

    getChildContext() {
      return {
        foo: true,
        bar: false,
      };
    },

    componentDidMount() {
      this.state.stamp = true;
    },

    shouldComponentUpdate() {
      return true;
    },

    render() {
      return false;
    },
  }).compose(mixin);

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
