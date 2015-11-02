'use strict';

const assert = require('assertthat');

const validator = require('../../lib/validators/number');

suite('number', function () {
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
    test('returns false for a non-number.', function (done) {
      assert.that(validator()('foo')).is.false();
      done();
    });

    test('returns true for a number.', function (done) {
      assert.that(validator()(23)).is.true();
      done();
    });

    test('returns true for 0.', function (done) {
      assert.that(validator()(0)).is.true();
      done();
    });

    suite('isInteger', function () {
      test('returns false for a decimal number.', function (done) {
        assert.that(validator({ isInteger: true })(3.7)).is.false();
        done();
      });

      test('returns true for an integer number.', function (done) {
        assert.that(validator({ isInteger: true })(7)).is.true();
        done();
      });
    });

    suite('min', function () {
      test('returns false for a too small number.', function (done) {
        assert.that(validator({ min: 5 })(3)).is.false();
        done();
      });

      test('returns true for a number large enough.', function (done) {
        assert.that(validator({ min: 5 })(7)).is.true();
        done();
      });
    });

    suite('max', function () {
      test('returns false for a too large number.', function (done) {
        assert.that(validator({ max: 5 })(7)).is.false();
        done();
      });

      test('returns true for a number small enough.', function (done) {
        assert.that(validator({ max: 5 })(3)).is.true();
        done();
      });
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: 42 })(23)).is.equalTo(23);
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: 42 })('foo')).is.equalTo(42);
      done();
    });
  });
});
