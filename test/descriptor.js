import test from 'tape';
import { isDesc } from '../src/utils/descriptor';

test('isDesc({ render() {} })', (t) => {
  t.plan(1);

  const result = isDesc({ render () {} });

  t.ok(
    result === false,
    'should return false'
  );
});


test('isDesc({ methods: {}, initializers: [] })', (t) => {
  t.plan(1);

  const result = isDesc(
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
