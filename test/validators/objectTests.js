'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/object');

suite('object', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-object.', function (done) {
      assert.that(validator()(23), is.false());
      done();
    });

    test('returns true for null.', function (done) {
      assert.that(validator()(null), is.true());
      done();
    });

    test('returns true for an object.', function (done) {
      assert.that(validator()({ foo: 'bar' }), is.true());
      done();
    });

    test('returns true for an empty object.', function (done) {
      assert.that(validator()({}), is.true());
      done();
    });

    suite('isOptional', function () {
      test('returns false for a missing mandatory object.', function (done) {
        assert.that(validator({ isOptional: false })(null), is.false());
        done();
      });

      test('returns true for a missing optional object.', function (done) {
        assert.that(validator({ isOptional: true })(null), is.true());
        done();
      });
    });
  });
});
