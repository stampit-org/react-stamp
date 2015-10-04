## Composition logic

Component composition might be compared to `React.createClass`'s mixin feature. A significant difference is that you compose a component without referencing the mixins being inherited from inside the component's declaration.


### State
Composed components inherit other components' state.

```js
const mixin = {
  state: {
    foo: true,
    bar: true,
  },
};

const component = reactStamp(React).compose(mixin);
```

```js
assert.deepEqual(
  component().state, { foo: true, bar: true },
  'should inherit state'
);
  >> ok
```

__*`React.createClass` throws an Invariant Violation when duplicate keys are found in `getInitialState`. `react-stamp` merges duplicate keys.*__

### Statics
Composed components inherit other components' statics.

```js
const mixin = {
  statics: {
    someStatic: {
      bar: true,
    },
  },

  propTypes: {
    bar: React.PropTypes.string,
  },
};

const component = reactStamp(React, {
  statics: {
    someStatic: {
      foo: true,
    },
  },

  propTypes: {
    foo: React.PropTypes.string,
  },
}).compose(mixin);
```

```js
assert.ok(
  component.propTypes.bar,
  'should inherit bar propType'
);
  >> ok
assert.ok(
  component.propTypes.foo,
  'should inherit foo propType'
);
  >> ok
assert.deepEqual(
  component.someStatic, { foo: true, bar: true },
  'should merge non-React statics'
);
  >> ok
```

__*`React.createClass` throws an Invariant Violation when duplicate keys are found in `propTypes` and `getDefaultProps`. `react-stamp` merges duplicate keys.*__

### Methods
Composed components inherit other components' methods. A handful of React lifecycle methods get 'wrapped' executing with first-in priority. All other methods override with last-in priority.

__Wrapped__

* componentWillMount
* componentDidMount
* componentWillReceiveProps
* componentWillUpdate
* componentDidUpdate
* componentWillUnmount
* getChildContext

```js
const mixin = {
  componentDidMount() {
    this.state.mixin = true;
  },
};

const component = reactStamp(React, {
  state: {
    component: false,
    mixin: false,
  },

  componentDidMount() {
    this.state.component = true;
  }
}).compose(mixin);

const instance = component();
instance.componentDidMount();
```

```js
assert.deepEqual(
  instance.state, { component: true, mixin: true },
  'should inherit functionality of mixable methods'
);
  >> ok
```
__*`React.createClass` throws an Invariant Violation when duplicate `shouldComponentUpdate` or `render` methods exist, `react-stamp` overrides with last-in priority.*__
