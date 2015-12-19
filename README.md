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
interface reactDesc {
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

Let's step through an example. It demos a pattern I call **Behavior Driven Composition**.

__container.js__
```js
container({
  React: Object,
  ...components: Function[]
}, ...behaviors?: Descriptor[]) => Stamp
```
```js
import reactStamp from 'react-stamp';

export default ({
  React,
  Button,
  Text,
}, ...behaviors) => (
  reactStamp(React).compose({
    state: {
      showText: false,
      clickable: false
    },

    render () {
      const { clickable, showText } = this.state;
      const { text } = this.props;

      return (
        <div>
          <Button
            disabled={!clickable}
            onClick={() => this.onClick && this.onClick()}
            value='click me'
          />
          <Text
            value={showText && text}
          />
        </div>
      );
    }
  }, ...behaviors)
);
```

BDC uses the concept of a container. The container is a [HOC](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) factory that defines the structure of a [smart component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). This particular container expects two children components, `Button`and `Text`. The container should be self-sufficient and boring. Personality can be added by inheriting behaviors. Keep reading to see an example.

__button.js__
```js
export default React => (
  ({ disabled, onClick, value }) => (
    <input
      type='button'
      disabled={disabled}
      onClick={onClick}
      value={value}
    />
  )
);
```

__text.js__
```js
export default React => (
  ({ value }) => (
    <div>{value}</div>
  )
);
```

BDC loves pure components. Pure components are simply [stateless functions](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components). Notice that we are exporting factories that inject React. Read why [here](https://github.com/ericelliott/react-pure-component-starter#pure-component-factories). The function signatures are designed based on the component signatures defined in the container.

__buttonBehavior.js__
```js
export default {
  componentWillMount () {
    this.state.clickable = true;
  },

  onClick () {
    this.setState({
      showText: !this.state.showText
    });
  },
};
```

Behavior mixins add personality to the app. Their traits should share a common behavior.

__index.js__
```js
import React from 'react';
import ReactDOM from 'react-dom';

import container from './container';
import button from './button';
import text from './text';
import buttonBehavior from './buttonBehavior';

const MyComponent = container({
  React,
  Button: button(React),
  Text: text(React),
}, buttonBehavior);

ReactDOM.render(
  <MyComponent text='behavior driven composition' />,
  document.getElementById('root')
);
```

With all of the pieces complete, we compose them together to produce the final React component. [CodePen](http://codepen.io/troutowicz/pen/BoZqXX?editors=001)

### Docs
* [API](docs/api.md)
* [Composition logic](docs/composition.md)
