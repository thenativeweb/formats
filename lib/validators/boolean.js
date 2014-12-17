'use strict';

var getReturnValue = require('../getReturnValue');

var validator = function (options) {
  options = options || {};

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (typeof value !== 'boolean') {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

module.exports = validator;
