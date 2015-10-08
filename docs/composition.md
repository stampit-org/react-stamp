## Composition logic

React users might wonder how component composition differs from the `React.createClass` mixin feature. A significant difference is that react-stamp decouples the relationship between component and mixin.

### State
Component state is deep merged.

```js
const obj1 = {
  state: {
    foo: true,
    bar: false,
  },
};

const obj2 = {
  state: {
    bar: true,
  },
};
```

```js
compose(obj1, obj2)().state => { foo: true, bar: true }
```

### Statics
Component statics are deep merged.

```js
const obj1 = {
  statics: {
    obj: {
      foo: true,
      bar: false,
    },
  },

  defaultProps: {
    foo: true,
    bar: false,
  },
};

const obj2 = {
  statics: {
    obj: {
      bar: true,
    },
  },

  defaultProps: {
    bar: true,
  },
};
```

```js
compose(obj1, obj2).obj => { foo: true, bar: true }
compose(obj1, obj2).defaultProps => { foo: true, bar: true }
```

### Methods
Component methods are either wrapped or overridden. React lifecycle methods, with the exception of `render`, get wrapped executing with first-in priority. All other methods override with last-in priority.

* `componentDidMount` - wrapped and ran sequentially
* `componentDidUpdate` - wrapped and ran sequentially
* `componentWillMount` - wrapped and ran sequentially
* `componentWillReceiveProps` - wrapped and ran sequentially
* `componentWillUnmount` - wrapped and ran sequentially
* `componentWillUpdate` - wrapped and ran sequentially
* `getChildContext` - wrapped and ran sequentially with results merged
* `shouldComponentUpdate` - wrapped and ran sequentially with results OR'd

```js
const obj1 = {
  state: {
    foo: true,
    bar: false,
  },

  shouldComponentUpdate() {
    return this.state.bar;
  }
};

const obj2 = {
  state: {
    bar: true,
  },

  shouldComponentUpdate() {
    return !this.state.bar;
  },
};
```

```js
compose(obj1, obj2)().shouldComponentUpdate() => true
```
