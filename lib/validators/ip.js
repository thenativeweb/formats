'use strict';

var net = require('net');

var getReturnValue = require('../getReturnValue'),
    throwOnUnknownProperties = require('../throwOnUnknownProperties');

var validator = function (options) {
  options = options || {};
  options.version = options.version || 0;

  throwOnUnknownProperties(options, [ 'version', 'default' ]);

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (!net.isIP(value)) {
      return returnValue.false;
    }

    if (options.version === 4 && !net.isIPv4(value)) {
      return returnValue.false;
    }

    if (options.version === 6 && !net.isIPv6(value)) {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

module.exports = validator;
