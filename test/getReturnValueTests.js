'use strict';

var assert = require('assertthat');

var getReturnValue = require('../lib/getReturnValue');

suite('getReturnValue', function () {
  test('is a function.', function (done) {
    assert.that(getReturnValue).is.ofType('function');
    done();
  });

  test('returns a boolean object if options.default is missing.', function (done) {
    assert.that(getReturnValue(23)).is.equalTo({
      true: true,
      false: false
    });
    done();
  });

  test('returns a value object if options.default is given.', function (done) {
    assert.that(getReturnValue(23, { default: 42 })).is.equalTo({
      true: 23,
      false: 42
    });
    done();
  });
});
