'use strict';

var assert = require('node-assertthat');

var getReturnValue = require('../lib/getReturnValue');

suite('getReturnValue', function () {
  test('is a function.', function (done) {
    assert.that(getReturnValue, is.ofType('function'));
    done();
  });

  test('...');
});
