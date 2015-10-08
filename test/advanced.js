import React from 'react';
import test from 'tape';

import { stamp } from '../src/utils';

test('stamp decorator', (t) => {
  t.plan(4);

  @stamp
  class Component extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        foo: true,
      };
    }

    render () {
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
