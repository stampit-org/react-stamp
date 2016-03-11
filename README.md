[![build status](https://img.shields.io/travis/stampit-org/react-stamp.svg?style=flat-square)](https://travis-ci.org/stampit-org/react-stamp)
[![npm version](https://img.shields.io/npm/v/react-stamp.svg?style=flat-square)](https://www.npmjs.com/package/react-stamp)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://troutowicz.mit-license.org)

# react-stamp
> Composables for React.

`react-stamp` has replaced [react-stampit](https://github.com/stampit-org/react-stampit) and is compliant with the [stamp specification](https://github.com/stampit-org/stamp-specification). The [Rtype specification](https://github.com/ericelliott/rtype#rtype) is used for documenting function signatures and data structures.

```
npm install react-stamp --save
```

### What is composition?

Composition is the act of creating an object from a collection of other objects. Many will say this is actually
multiple inheritance, not composition. Well, in the **classical** sense of the word, they're right! However, JavaScript
favors [prototypal inheritance](https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a), and composition is actually Prototypal OO's [primary mechanism](http://ericleads.com/2013/02/fluent-javascript-three-different-kinds-of-prototypal-oo/). Composition encompasses differential inheritance, concatenative inheritance, and functional inheritance.

### But I like [HOC](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)s.

So do I! HOC factories provide a functional API for component composition and stamp composition can be a nice complement. If the goal is to be functional and avoid APIs that expose `class` and it's **pseudo-classical** behavior, why use `class` at all?

### React.createClass 2.0?

No. The only similarity is that both provide forms of object composition. `react-stamp` decouples the relationship between component and mixin while being less opinionated. This provides greater flexibility.

### So what is this?

`react-stamp` is the result of wondering about what other ways a React component could be represented. [Stamps](https://github.com/stampit-org/stamp-specification) are a cool concept and more importantly have proven to be a great alternative to `React.createClass` and the ES2015 `class` due to their composability.

`react-stamp` exports a function that accepts one parameter, the React library.

```js
reactStamp(React?: Object) => Stamp
```

This method converts React's `Component` constructor function into a [stamp](https://github.com/stampit-org/stamp-specification). To create a React component, we pass a descriptor object to the stamp's `compose` method.

```js
interface ReactDesc {
  displayName?: String,
  init?: Function,
  state?: Object,
  statics?: Object,
  contextTypes?: Object,
  childContextTypes?: Object,
  propTypes?: Object,
  defaultProps?: Object,
  ...methods?: Function
}

stamp.compose(...desc?: Stamp|ReactDesc|SpecDesc[]) => Stamp
```

The most powerful feature of [stamps](https://github.com/stampit-org/stamp-specification) is their composability. Any number of stamps can be combined into a new stamp which inherits each passed stamp's behavior. This behavior is suitable for React since `class` is being pushed as the new norm and does not provide an idiomatic way to utilize mixins. (classical inheritance :disappointed:).

### Examples
* [bdc](https://github.com/troutowicz/bdc)

### Docs
* [API](docs/api.md)
* [Composition logic](docs/composition.md)
