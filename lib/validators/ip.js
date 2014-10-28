'use strict';

var net = require('net');

var validator = function (options) {
  options = options || {};
  options.version = options.version || 0;

  return function (value) {
    if (!net.isIP(value)) {
      return false;
    }

    if (options.version === 4 && !net.isIPv4(value)) {
      return false;
    }

    if (options.version === 6 && !net.isIPv6(value)) {
      return false;
    }

    return true;
  };
};

module.exports = validator;
