import React from 'react/addons';
import reactStamp from '../src';
import test from 'tape';
import { cache } from '../src/utils';

const TestUtils = React.addons.TestUtils;
const shallowRenderer = TestUtils.createRenderer();

const mixin1 = {
  componentWillMount() {
    this.state.mixin1 = true;
  },
};

const mixin2 = {
  componentWillMount() {
    this.state.mixin2 = true;
  },
};

const id = cache.uniqueId();
const componentFactory = React => {
  return cache.find(id) || cache.save(
    reactStamp(React, {
      state: {
        comp: false,
        mixin1: false,
        mixin2: false,
      },

      _onClick() {
        return this.state;
      },

      componentWillMount() {
        this.state.comp = true;
      },

      render() {
        return <input type='button' onClick={() => this._onClick()} />;
      },
    }), id
  );
};

const ComposedComp = componentFactory(React).compose(mixin1, mixin2);

shallowRenderer.render(<ComposedComp />);
const button = shallowRenderer.getRenderOutput();

test('factory example', (t) => {
  t.plan(1);

  t.deepEqual(
    button.props.onClick(), { comp: true, mixin1: true, mixin2: true },
    'should return component state with all truthy props'
  );
});
