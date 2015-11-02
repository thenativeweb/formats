'use strict';

const assert = require('assertthat');

const validator = require('../../lib/validators/boolean');

suite('boolean', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator()).is.ofType('function');
    done();
  });

  test('throws on unknown properties.', function (done) {
    assert.that(function () {
      validator({ nonExistent: 'foobar' });
    }).is.throwing('Unknown property nonExistent.');
    done();
  });

  suite('basics', function () {
    test('returns false for a non-boolean.', function (done) {
      assert.that(validator()('foo')).is.false();
      done();
    });

    test('returns true for true.', function (done) {
      assert.that(validator()(true)).is.true();
      done();
    });

    test('returns true for false.', function (done) {
      assert.that(validator()(true)).is.true();
      done();
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: true })(false)).is.false();
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: true })(23)).is.true();
      done();
    });
  });
});
