'use strict';

// Basically, the following lines could be replaced by a single call to the
// require-all module, but this would break browserify compatibility. Hence,
// the require calls are made manually here.
var formats = {
  alphanumeric: require('./validators/alphanumeric'),
  boolean: require('./validators/boolean'),
  custom: require('./validators/custom'),
  email: require('./validators/email'),
  function: require('./validators/function'),
  ip: require('./validators/ip'),
  number: require('./validators/number'),
  object: require('./validators/object'),
  string: require('./validators/string'),
  uuid: require('./validators/uuid')
};

var keys = Object.keys(formats);
keys.forEach(function (key) {
  var newKey = 'is' + key[0].toUpperCase() + key.substring(1);
  formats[newKey] = function (value, options) {
    return formats[key](options)(value);
  };
});

module.exports = formats;
