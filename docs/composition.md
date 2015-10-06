## Composition logic

React users might wonder how component composition differs from the `React.createClass` mixin feature. A significant difference is that react-stamp decouples the relationship between component and mixin.

### State
Component state is deep merged.

**TODO: Example**

### Statics
Component statics are deep merged.

**TODO: Example**

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
