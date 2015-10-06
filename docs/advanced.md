## Advanced use cases

### Class decorator

For all those nice guys/gals that like `class` and just want some mixability. It is assumed that the component directly extends React.Component, anything else should be inherited via stamp composition.

```js
import React from 'react/addons';
import { stamp } from 'react-stamp/utils';

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

Component = Component.compose(mixin);
```

```js
assert.deepEqual(
  Component().state, { foo: 'foo', bar: 'bar' },
  'should inherit mixin state'
);
  >> ok
assert.deepEqual(
  Component.defaultProps, { foo: 'foo', bar: 'bar' }
  'should inherit `defaultProps` props'
);
  >> ok
```

__*Warning: Class decorators are a proposal for ES2016, they are not set in stone.*__

