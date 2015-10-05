import React from 'react';
import test from 'tape';

import reactStamp from '../src';
import { cache, stamp } from '../src/utils';

test('stamp decorator', (t) => {
  t.plan(4);

  @stamp
  class Component extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        foo: true,
      };
    }

    render() {
      return null;
    }
  }

  Component.defaultProps = {
    foo: true,
    bar: true,
  };

  const mixin = {
    state: {
      foo: true,
      bar: true,
    },

    defaultProps: {
      bar: true,
    },
  };

  t.ok(Component.compose, 'converts class to stamp');
  /* eslint-disable new-cap */
  t.ok(Component().render, 'maps methods');
  t.deepEqual(
    Component.compose(mixin)().state, { foo: true },
    'merges state, initializers take priority'
  );
  t.deepEqual(
    Component.compose(mixin).defaultProps, { foo: true, bar: true },
    'merges statics'
  );
  /* eslint-enable new-cap */
});

test('stamp factory using `cacheStamp`', (t) => {
  t.plan(2);

  const id1 = cache.uniqueId();
  const id2 = cache.uniqueId();

  const stampFactory1 = React => {
    return cache.find(id1) || cache.save(
      reactStamp(React, {
        displayName: 'Component',
      }), id1
    );
  };

  const stampFactory2 = React => {
    return cache.find(id2) || cache.save(
      reactStamp(React)
    );
  };

  t.equal(
    stampFactory1(React), stampFactory1(React),
    'is memoized if unique id is defined'
  );

  t.notEqual(
    stampFactory2(React), stampFactory2(React),
    'is not memoized if unique id is undefined'
  );
});
