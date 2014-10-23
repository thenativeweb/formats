'use strict';

var validator = function (options) {
  options = options || {};

  return function (value) {
    // The regular expression is taken from the official W3C HTML5
    // specification, see http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
  };
};

module.exports = validator;
