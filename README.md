[![Build Status](https://travis-ci.org/troutowicz/react-stamp.svg)](https://travis-ci.org/troutowicz/react-stamp)

# react-stamp
> Composables for React.

* **This library has replaced [react-stampit](https://github.com/stampit-org/react-stampit) and is compliant with the [stamp specification](https://github.com/stampit-org/stamp-specification).**
* **The [Rtype specification](https://github.com/ericelliott/rtype#rtype) is used for documenting function signatures and data structures.**

### What is this

This library is the result of wondering about what other ways a React component could be represented. [Stamps](https://github.com/stampit-org/stamp-specification) are a cool concept, and more importantly have proven to be a great alternative to `React.createClass` and the ES2015 `class` due to their composability.

`reactStamp` accepts one parameter. The React library.

```js
reactStamp(React?: object): stamp
```

This method converts React's `Component` constructor function into a [stamp](https://github.com/stampit-org/stamp-specification). To create a React component, we pass a descriptor object to the stamp's `compose` method.

```js
interface reactDesc {
  init?: func,
  state?: object,
  statics?: object,
  contextTypes?: object,
  childContextTypes?: object,
  propTypes?: object,
  defaultProps?: object,
  ...methods?: func
}

stamp.compose(...desc?: stamp || reactDesc || specDesc): stamp
```

The most powerful feature of [stamps](https://github.com/stampit-org/stamp-specification) is their composability. What this means is that `n` number of stamps can be combined into a new stamp which inherits each passed stamp's behavior. This is perfect for React, since `class` is being pushed as the new norm and does not provide an idiomatic way to use mixins. (classical inheritance :disappointed:). Stamps embrace prototypal inheritance and as a result provide great flexibility when extending React components.

__reactStamp.js__
```js
import React from 'react';
import reactStamp from 'react-stamp';

export default reactStamp(React);
```

__component.js__

```js
import reactStamp from './reactStamp';

export default reactStamp.compose({
  state: {
    obj1: false,
    obj2: false,
  },

  componentWillMount() {
    this.setState({ obj1: true });
  },

  _onClick() {
    return this.state;
  },

  render() {
    return (
      <input
        type='button'
        onClick={() => this._onClick()}
        value='Click Me'
       />
    );
  },
});
```

__mixin.js__

```js
export default {
  componentWillMount() {
    this.setState({ obj2: true });;
  },
};
```

__app.js__

```js
import Component from './component';
import mixin from './mixin';

const Button = Component.compose(mixin);

React.render(<Button/>, document.body);
```

```js
onClick() => { obj1: true, obj2: true }
```

* no autobinding

 Event handlers require explicit binding. No magic. This can be done using `.bind` or through lexical binding with ES2015 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) as shown in the example.
* no `call super`

 React lifecycle methods, with the exception of `render`, are wrapped during composition providing functional inheritance.
* components and mixins are POJOs

If you feel limited by `class`, or want a fresh take on `React.createClass`'s mixability, maybe give react-stamp a try and learn more about what [stamps](https://github.com/stampit-org/stamp-specification) are all about.

### Docs
* [API](docs/api.md)
* [Composition logic](docs/composition.md)
* [Advanced use cases](docs/advanced.md)

### Examples
* [react-hello](https://github.com/stampit-org/react-hello)

### Pending Issues
* [x] [childContextTypes](https://github.com/facebook/react/pull/3940)
* [x] [component testing](https://github.com/facebook/react/pull/3941)

### License
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](http://troutowicz.mit-license.org)
