'use strict';

var validator = function (options) {
  options = options || {};
  options.isOptional = options.isOptional !== false;

  return function (value) {
    if (typeof value !== 'object') {
      return false;
    }

    if (value === null && !options.isOptional) {
      return false;
    }

    return true;
  };
};

module.exports = validator;
