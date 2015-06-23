'use strict';

var assert = require('assertthat');

var getReturnValue = require('../../lib/getReturnValue'),
    validator = require('../../lib/validators/custom');

var range = function (options) {
  options = options || {};
  options.min = options.min || Number.NEGATIVE_INFINITY;
  options.max = options.max || Number.POSITIVE_INFINITY;

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (typeof value !== 'number') {
      return returnValue.false;
    }

    if (value < options.min) {
      return returnValue.false;
    }

    if (value > options.max) {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

suite('custom', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('throws an error if validator is missing.', function (done) {
    assert.that(function () {
      validator();
    }).is.throwing('Validator is missing.');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(range({ min: 5, max: 23 }))).is.ofType('function');
    done();
  });

  test('returns the requested validator.', function (done) {
    var rangeValidator = validator(range({ min: 5, max: 23 }));

    assert.that(rangeValidator(7)).is.true();
    assert.that(rangeValidator(23)).is.true();
    assert.that(rangeValidator(42)).is.false();
    done();
  });

  test('returns the requested validator with default option.', function (done) {
    var rangeValidator = validator(range({ min: 5, max: 23, default: 7 }));

    assert.that(rangeValidator(7)).is.equalTo(7);
    assert.that(rangeValidator(23)).is.equalTo(23);
    assert.that(rangeValidator(42)).is.equalTo(7);
    done();
  });
});
