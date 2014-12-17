'use strict';

var getReturnValue = function (value, options) {
  var useBooleanAsReturnValue = !options.hasOwnProperty('default');

  return {
    true: useBooleanAsReturnValue ? true : value,
    false: useBooleanAsReturnValue ? false : options.default
  };
};

module.exports = getReturnValue;
