'use strict';

var validator = function (options) {
  options = options || {};

  return function (value) {
    if (typeof value !== 'boolean') {
      return false;
    }

    return true;
  };
};

module.exports = validator;