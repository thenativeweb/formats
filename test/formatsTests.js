'use strict';

var assert = require('node-assertthat');

var formats = require('../lib/formats');

suite('formats', function () {
  test('is an object.', function (done) {
    assert.that(formats, is.ofType('object'));
    done();
  });

  test('contains validators.', function (done) {
    assert.that(formats.string, is.ofType('function'));
    done();
  });
});
