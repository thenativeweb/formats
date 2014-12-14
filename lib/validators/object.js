'use strict';

var validator = function (options) {
  options = options || {};
  options.isOptional = options.isOptional || false;
  options.schema = options.schema || null;
  options.isSchemaRelaxed = options.isSchemaRelaxed || false;

  if (options.isSchemaRelaxed && !options.schema) {
    throw new Error('Schema is missing.')
  }

  return function (value) {
    var key;

    if (typeof value !== 'object') {
      return false;
    }

    if (value === null && !options.isOptional) {
      return false;
    }

    if (!options.schema) {
      return true;
    }

    for (key in options.schema) {
      if (options.schema.hasOwnProperty(key)) {
        if (!options.schema[key](value[key])) {
          return false;
        }
      }
    }

    if (!options.isSchemaRelaxed) {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          if (!options.schema[key]) {
            return false;
          }
        }
      }
    }

    return true;
  };
};

module.exports = validator;
