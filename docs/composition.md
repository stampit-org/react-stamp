## Composition logic

Stamp composition might be compared to `React.createClass`'s mixin feature. A significant difference is that you compose a stamp without referencing the stamps being inherited from inside the stamp's declaration.


### State
Composed stamps inherit other stamps' state. State is merged, throwing on duplicate keys.

```js
const mixin = {
  state: {
    foo: 'foo',
    bar: 'bar',
  },
};

const component = createStamp(React).compose(mixin);
```

```js
assert.deepEqual(
  component().state, { foo: 'foo', bar: 'bar },
  'should inherit state'
);
  >> ok
```

__*`React.createClass` throws an Invariant Violation when duplicate keys are found within mixins. `react-stamp` will throw a TypeError.*__

### Statics
Composed stamps inherit other stamps' statics. React statics are merged, throwing on duplicate keys for `propTypes` and `defaultProps`. Non-React statics override with last-in priority.

```js
const mixin = {
  statics: {
    someStatic: {
      bar: 'bar',
    },
  },

  propTypes: {
    bar: React.PropTypes.string,
  },
};

const component = createStamp(React, {
  statics: {
    someStatic: {
      foo: 'foo',
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
  component.someStatic, { foo: 'foo' },
  'should override non-React statics'
);
  >> ok
```

__*`React.createClass` throws an Invariant Violation when duplicate keys are found in `getDefaultProps` and `getInitialState`. `react-stamp` will throw a TypeError.*__

### Methods
Composed stamps inherit other stamps' methods. A handful of React methods will be 'wrapped' executing with first-in priority. Any non-React methods or React methods with a unique constraint will throw on duplicates.

__Wrapped__

* componentWillMount
* componentDidMount
* componentWillReceiveProps
* componentWillUpdate
* componentDidUpdate
* componentWillUnmount
* getChildContext

__Unique__

* shouldComponentUpdate
* render

```js
const mixin = {
  componentDidMount() {
    this.state.mixin = true;
  },
};

const component = createStamp(React, {
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
__*`React.createClass` throws an Invariant Violation when duplicate `shouldComponentUpdate` or `render` methods exist, `react-stamp` will throw a TypeError.*__
