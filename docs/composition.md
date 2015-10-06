## Composition logic

Component composition might be compared to `React.createClass`'s mixin feature. A significant difference is that react-stamp decouples the relationship between component and mixin.


### State
Component state is deep merged.

**TODO: Example**

__*`React.createClass` throws an Invariant Violation when duplicate keys are found in `getInitialState`. `react-stamp` merges duplicate keys.*__

### Statics
Component statics are deep merged.

**TODO: Example**

__*`React.createClass` throws an Invariant Violation when duplicate keys are found in `propTypes` and `getDefaultProps`. `react-stamp` merges duplicate keys.*__

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

**TODO: Example**

__*`React.createClass` throws an Invariant Violation when duplicate `shouldComponentUpdate` or `render` methods exist. `react-stamp` ORs the results of `shouldComponentUpdate` and overrides `render` with last-in priority.*__
