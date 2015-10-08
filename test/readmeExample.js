import React from 'react/addons';
import test from 'tape';

import reactStamp from '../src';

const TestUtils = React.addons.TestUtils;
const shallowRenderer = TestUtils.createRenderer();

const obj1 = {
  state: {
    obj1: false,
    obj2: false,
  },

  componentWillMount () {
    this.setState({ obj1: true });
  },

  _onClick () {
    return this.state;
  },

  render () {
    return (
      <input
        type='button'
        onClick={() => this._onClick()}
        value='Click Me'
       />
    );
  },
};

const obj2 = {
  componentWillMount () {
    this.setState({ obj2: true });
  },
};

const Button = reactStamp(React).compose(obj1, obj2);

shallowRenderer.render(React.createElement(Button));
const button = shallowRenderer.getRenderOutput();

test('readme example', (t) => {
  t.plan(1);

  t.deepEqual(
    button.props.onClick(), { obj1: true, obj2: true },
    'should return component state with all truthy props'
  );
});

