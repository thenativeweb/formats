'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/boolean');

suite('boolean', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-boolean.', function (done) {
      assert.that(validator()('foo'), is.false());
      done();
    });

    test('returns true for true.', function (done) {
      assert.that(validator()(true), is.true());
      done();
    });

    test('returns true for false.', function (done) {
      assert.that(validator()(true), is.true());
      done();
    });
  });
});
