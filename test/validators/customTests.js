'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/custom');

var range = function (options) {
  options = options || {};
  options.min = options.min || Number.MIN_VALUE;
  options.max = options.max || Number.MAX_VALUE;

  return function (value) {
    if (typeof value !== 'number') {
      return false;
    }

    if (value < options.min) {
      return false;
    }

    if (value > options.max) {
      return false;
    }

    return true;
  };
};

suite('custom', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('throws an error if validator is missing.', function (done) {
    assert.that(function () {
      validator();
    }, is.throwing('Validator is missing.'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(range({ min: 5, max: 23 })), is.ofType('function'));
    done();
  });

  test('returns the requested validator.', function (done) {
    var rangeValidator = validator(range({ min: 5, max: 23 }));
    assert.that(rangeValidator(7), is.true());
    assert.that(rangeValidator(23), is.true());
    assert.that(rangeValidator(42), is.false());
    done();
  });
});
