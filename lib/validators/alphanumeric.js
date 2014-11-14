'use strict';

var validator = function (options) {
  options = options || {};
  options.minLength = options.minLength || 0;
  options.maxLength = options.maxLength || Number.MAX_VALUE;

  return function (value) {
    if (typeof value !== 'string') {
      return false;
    }

    if (value.length < options.minLength) {
      return false;
    }

    if (value.length > options.maxLength) {
      return false;
    }

    return /^[a-zA-Z0-9]*$/.test(value);
  };
};

module.exports = validator;
