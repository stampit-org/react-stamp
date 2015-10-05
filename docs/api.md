## API

### reactStamp([React], [desc])

Returns a stamp.

* @param  {Object} React The React library.
* @param  {Object} desc A description object.
* @return {Function} stamp A stamp.
* @return {Function} stamp.compose Creates a new stamp using passed stamps/descriptors.

### The Descriptor Object

The properties that define a React component.

* `init` - A method that gets called when a stamp is invoked.
* `state` - An object for defining component state.
* `statics` - An object for defining component statics.
* `contextTypes` - A convenience property for the static property of the same name.
* `childContextTypes` - A convenience property for the static property of the same name.
* `propTypes` - A convenience property for the static property of the same name.
* `defaultProps` - A convenience property for the static property of the same name.

Any included properties not defined above will be treated as methods.
