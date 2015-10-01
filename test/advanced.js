import keys from 'lodash/object/keys';
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
        foo: 'foo',
      };
    }

    render() {
      return null;
    }
  }

  Component.defaultProps = {
    foo: 'foo',
  };

  const mixin = {
    state: {
      bar: 'bar',
    },

    defaultProps: {
      bar: 'bar',
    },
  };

  t.ok(Component.compose, 'converts class to stamp');
  /* eslint-disable new-cap */
  t.ok(Component().render, 'maps methods');
  t.deepEqual(
    keys(Component.compose(mixin)().state), ['foo', 'bar'],
    'merges state'
  );
  t.deepEqual(
    keys(Component.compose(mixin).defaultProps), ['foo', 'bar'],
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
