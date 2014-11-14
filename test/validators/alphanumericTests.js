'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/alphanumeric');

suite('alphanumeric', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-string.', function (done) {
      assert.that(validator()(23), is.false());
      done();
    });

    test('returns false for a non-alphanumeric.', function (done) {
      assert.that(validator()('foo-bar'), is.false());
      done();
    });

    test('returns true for an alphanumeric.', function (done) {
      assert.that(validator()('fooBar23'), is.true());
      done();
    });

    suite('minLength', function () {
      test('returns false for a too short string.', function (done) {
        assert.that(validator({ minLength: 5 })('foo'), is.false());
        done();
      });

      test('returns true for a string long enough.', function (done) {
        assert.that(validator({ minLength: 5 })('foobar'), is.true());
        done();
      });
    });

    suite('maxLength', function () {
      test('returns false for a too long string.', function (done) {
        assert.that(validator({ maxLength: 5 })('foobar'), is.false());
        done();
      });

      test('returns true for a string short enough.', function (done) {
        assert.that(validator({ maxLength: 5 })('foo'), is.true());
        done();
      });
    });
  });
});
