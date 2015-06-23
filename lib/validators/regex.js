'use strict';

var getReturnValue = require('../getReturnValue');

var validator = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.expression) {
    throw new Error('Regular expression is missing.');
  }

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (!options.expression.test(value)) {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

module.exports = validator;
