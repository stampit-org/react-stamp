## API

### reactStamp

```js
(React?: Object) => Stamp
```

Returns a stamp.

### stamp.compose

```js
(...desc?: Stamp|ReactDesc|SpecDesc[]) => Stamp
```

Creates a new stamp using the current stamp as a base, composed with a list of stamps/descriptors passed as arguments.

### reactDesc

The properties that define a React component/mixin.

```js
interface reactDesc {
  init?: Function,
  state?: Object,
  statics?: Object,
  contextTypes?: Object,
  childContextTypes?: Object,
  propTypes?: Object,
  defaultProps?: Object,
  ...methods?: Function
}
```

* `init` - A method that gets called when a stamp is invoked.
* `state` - An object for defining component state.
* `statics` - An object for defining component statics.
* `contextTypes` - A convenience property for the static property of the same name.
* `childContextTypes` - A convenience property for the static property of the same name.
* `propTypes` - A convenience property for the static property of the same name.
* `defaultProps` - A convenience property for the static property of the same name.
