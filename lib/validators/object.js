'use strict';

var getReturnValue = require('../getReturnValue'),
    throwOnUnknownProperties = require('../throwOnUnknownProperties');

var validator = function (options) {
  options = options || {};
  options.isOptional = options.isOptional || false;
  options.schema = options.schema || null;
  options.isSchemaRelaxed = options.isSchemaRelaxed || false;

  throwOnUnknownProperties(options, [ 'isOptional', 'schema', 'isSchemaRelaxed', 'default' ]);

  if (options.isSchemaRelaxed && !options.schema) {
    throw new Error('Schema is missing.');
  }

  return function (value) {
    var key,
        returnValue = getReturnValue(value, options);

    if (typeof value !== 'object') {
      return returnValue.false;
    }

    if (value === null && !options.isOptional) {
      return returnValue.false;
    }

    if (!options.schema) {
      return returnValue.true;
    }

    for (key in options.schema) {
      if (options.schema.hasOwnProperty(key)) {
        if (!options.schema[key](value[key])) {
          return returnValue.false;
        }
      }
    }

    if (!options.isSchemaRelaxed) {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          if (!options.schema[key]) {
            return returnValue.false;
          }
        }
      }
    }

    return returnValue.true;
  };
};

module.exports = validator;
