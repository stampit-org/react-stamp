## Advanced use cases

### Component factory

__mixin1.jsx__

```js
export default {
  componentWillMount() {
    this.state.mixin1 = true;
  },
};
```

__mixin2.jsx__

```js
export default {
  componentWillMount() {
    this.state.mixin2 = true;
  },
};
```

__component.jsx__

```js
import reactStamp from 'react-stamp';
import { cache } from 'react-stamp/utils';

const id = cache.uniqueId();

export default React => {
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
```

__app.jsx__

```js
import React from 'react';

import componentFactory from './component';
import mixin1 from './mixin1';
import mixin2 from './mixin2';

const ComposedComp = componentFactory(React).compose(mixin1, mixin2);

/**
 * Do things
 */
```

```js
onClick() => { comp: true, mixin1: true, mixin2: true }
```

* component is a factory

 This design pattern is optional, but recommended. Component factories are react-stamp's solution for avoiding the often hard to debug problems created by multiple instances of React. Read more about that [here](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375). By injecting the React library, we are able to guarantee the version and instance of React that a component will receive.

* caching

 This goes hand in hand with designing components as factories. Node.js's internal caching will not work as expected for component factories, react-stamp's cache utility can be used as a replacement.

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

__*Warning: Class decorators are a proposal for ES7, they are not set in stone.*__

