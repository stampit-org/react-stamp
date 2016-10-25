import test from 'tape';
import { isStampDescriptor } from '../src/utils/descriptor';

test('isStampDescriptor({ render() {} })', (t) => {
  t.plan(1);

  const result = isStampDescriptor({ render () {} });

  t.ok(
    result === false,
    'should return false'
  );
});


test('isStampDescriptor({ methods: {}, initializers: [] })', (t) => {
  t.plan(1);

  const result = isStampDescriptor(
    { methods: {
        isReactComponent: {},
        setState () {},
        forceUpdate () {}
      },
      initializers: [ () => {} ]
    }
  );

  t.ok(
    result === true,
    'should return true'
  );
});
