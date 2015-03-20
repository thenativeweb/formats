'use strict';

var assert = require('assertthat');

var validator = require('../../lib/validators/date');

suite('date', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator()).is.ofType('function');
    done();
  });

  suite('basics', function () {
    test('returns false for a non-date.', function (done) {
      assert.that(validator()('foo')).is.false();
      done();
    });

    test('returns false for an object that is not a date.', function (done) {
      assert.that(validator()(new Error())).is.false();
      done();
    });

    test('returns true for a date.', function (done) {
      assert.that(validator()(new Date())).is.true();
      done();
    });

    suite('min', function () {
      test('returns false for a too early date.', function (done) {
        assert.that(validator({ min: new Date(2015, 0, 1) })(new Date(2014, 11, 31))).is.false();
        done();
      });

      test('returns true for a date late enough.', function (done) {
        assert.that(validator({ min: new Date(2015, 0, 1) })(new Date(2015, 11, 31))).is.true();
        done();
      });
    });

    suite('max', function () {
      test.skip('returns false for a too late date.', function (done) {
        assert.that(validator({ max: new Date(2015, 0, 1) })(new Date(2015, 11, 31))).is.false();
        done();
      });

      test.skip('returns true for a date early enough.', function (done) {
        assert.that(validator({ max: new Date(2015, 0, 1) })(new Date(2014, 11, 31))).is.true();
        done();
      });
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      var now = new Date(),
          past = new Date(20015, 0, 1);

      assert.that(validator({ default: now })(past)).is.equalTo(past);
      done();
    });

    test('returns the default value if not valid.', function (done) {
      var now = new Date();

      assert.that(validator({ default: now })('foo')).is.equalTo(now);
      done();
    });
  });
});
