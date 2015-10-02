[![Build Status](https://travis-ci.org/troutowicz/react-stamp.svg)](https://travis-ci.org/troutowicz/react-stamp)

# react-stamp
> Composables for React.

**This library is replacing [react-stampit](https://github.com/stampit-org/react-stampit) and is compliant with the [stamp specification](https://github.com/stampit-org/stamp-specification). It is a WIP.**

## What is this

This library is the result of wondering about what other ways a React component could be represented. [Stamps](https://github.com/stampit-org/stamp-specification) are a cool concept, and more importantly have proven to be a great alternative to `React.createClass` and the ES2015 `class` due to their composability.

react-stamp provides an API similar to `React.createClass` while being stamp-compatible. The factory accepts two parameters, the React library and a description object.

```js
reactStamp(React, {
  init() {},
  state: {},
  statics: {},

  // convenience props for React statics
  contextTypes: {},
  childContextTypes: {}.
  propTypes: {},
  defaultProps: {},

  // ...methods
});
```

The best part about [stamps](https://github.com/stampit-org/stamp-specification) is their composability. What this means is that `n` number of stamps can be combined into a new stamp which inherits each passed stamp's behavior. This is perfect for React, since `class` is being pushed as the new norm and does not provide an idiomatic way to use mixins. (classical inheritance :disappointed:). While stamps and their composability are a new concept, the conventions used underneath are idiomatic to JavaScript; it is these conventions that provide a multitude of ways to extend React components.

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
import React from 'react';
import reactStamp from 'react-stamp';

export default reactStamp(React, {
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
});
```

__app.jsx__

```js
import Component from './component';
import mixin1 from './mixin1';
import mixin2 from './mixin2';

const ComposedComp = Component.compose(mixin1, mixin2);

/**
 * Do things
 */
```

```js
onClick() => { comp: true, mixin1: true, mixin2: true }
```

* no autobinding

 Event handlers require explicit binding. No magic. This can be done using `.bind` or through lexical binding with ES2015 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) as shown in the example.
* no `call super`

 React methods are wrapped during composition, providing functional inheritance. Sweet.
* mixins are POJOs

 This is shorthand syntax for:
 ```js
 reactStamp(null, {
   // stuff
 });
 ```

If you feel limited by `class`, or want a fresh take on `React.createClass`, maybe give react-stamp a try and learn more about what [stamps](https://github.com/stampit-org/stamp-specification) are all about.

## Docs
* [API](docs/api.md)
* [Composition logic](docs/composition.md)
* [Advanced use cases](docs/advanced.md)

## Examples
* [react-hello](https://github.com/stampit-org/react-hello)

## Pending Issues
* [x] [childContextTypes](https://github.com/facebook/react/pull/3940)
* [x] [component testing](https://github.com/facebook/react/pull/3941)

## License
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](http://troutowicz.mit-license.org)
