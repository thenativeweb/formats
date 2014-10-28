'use strict';

var validator = function (options) {
  options = options || {};
  options.min = options.min || Number.NEGATIVE_INFINITY;
  options.max = options.max || Number.POSITIVE_INFINITY;

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

module.exports = validator;
