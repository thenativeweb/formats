'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/number');

suite('number', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-number.', function (done) {
      assert.that(validator()('foo'), is.false());
      done();
    });

    test('returns true for a number.', function (done) {
      assert.that(validator()(23), is.true());
      done();
    });

    test('returns true for 0.', function (done) {
      assert.that(validator()(0), is.true());
      done();
    });

    suite('min', function () {
      test('returns false for a too small number.', function (done) {
        assert.that(validator({ min: 5 })(3), is.false());
        done();
      });

      test('returns true for a number large enough.', function (done) {
        assert.that(validator({ min: 5 })(7), is.true());
        done();
      });
    });

    suite('max', function () {
      test('returns false for a too large number.', function (done) {
        assert.that(validator({ max: 5 })(7), is.false());
        done();
      });

      test('returns true for a number small enough.', function (done) {
        assert.that(validator({ max: 5 })(3), is.true());
        done();
      });
    });
  });
});
