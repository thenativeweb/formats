'use strict';

var validator = function (options) {
  options = options || {};

  return function (value) {
    return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(value);
  };
};

module.exports = validator;
