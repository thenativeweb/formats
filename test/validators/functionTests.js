'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/function');

suite('function', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-function.', function (done) {
      assert.that(validator()('foo'), is.false());
      done();
    });

    test('returns true for a function.', function (done) {
      assert.that(validator()(function () {}), is.true());
      done();
    });
  });
});
