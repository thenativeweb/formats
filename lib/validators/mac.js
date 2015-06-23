'use strict';

var getReturnValue = require('../getReturnValue');

var validator = function (options) {
  options = options || {};

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value)) {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

module.exports = validator;
