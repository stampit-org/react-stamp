# react-stamp
> Composables for React.

## What is this

This library is the result of wondering about what other ways a React component could be represented. [Stamps](https://github.com/stampit-org/stamp-specification) are a cool concept, and more importantly have proven to be a great alternative to `React.createClass` and the ES6 `class` due to their flexibility and use of multiple kinds of prototypal inheritance.

react-stamp has an API similar to `React.createClass`. The factory accepts two parameters, the React library and a description object.

```js
createStamp(React, {
  init: [],
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

The best part about [stamps](https://github.com/stampit-org/stamp-specification) is their composability. What this means is that `n` number of stamps can be combined into a new stamp which inherits each passed stamp's behavior. This is perfect for React, since `class` is being pushed as the new norm and does not provide an idiomatic way to use mixins. (classical inheritance :disappointed:). While stamp composability on the surface is a new concept, the conventions used underneath are idiomatic to JavaScript; it is these conventions that provide a limitless way to extend any React component.

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
import createClass from 'react-stamp';
import { cache } from 'react-stamp/utils';

const id = cache.uniqueId();

export default React => {
  return cache.find(id) || cache.save(
    createStamp(React, {
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

const Component = componentFactory(React).compose(mixin1, mixin2);

/**
 * Do things
 */
```

```js
shallowRenderer.render(<Component />);
const button = shallowRenderer.getRenderOutput();

assert.deepEqual(
  button.props.onClick(), { comp: true, mixin1: true, mixin2: true },
  'should return component state with all truthy props'
);
  >> ok
```

You may have noticed several interesting behaviors.

* component is a factory

 This design pattern is optional, but recommended. Component factories are react-stamp's solution for avoiding the often hard to debug problems created by multiple instances of React. Read more about that [here](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375). By injecting the React library, we are able to guarantee the version and instance of React that a component will receive.

* caching

 This goes hand in hand with designing components as factories. Node.js's internal caching will not work as expected for component factories, react-stamp's cache utility can be used as a replacement.

* no autobinding

 Event handlers require explicit binding. No magic. This can be done using `.bind` or through lexical binding with ES6 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) as shown in the example.
* no `call super`

 React methods are wrapped during composition, providing functional inheritance. Sweet.
* mixins are POJOs

 This is shorthand syntax for:
 ```js
 createStamp(null, {
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
