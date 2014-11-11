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

  test('contains is* validators.', function (done) {
    assert.that(formats.isString, is.ofType('function'));
    done();
  });

  suite('is* validators', function () {
    test('validates the given value.', function (done) {
      assert.that(formats.isString('foobar'), is.true());
      assert.that(formats.isString(23), is.false());
      done();
    });

    test('validates the given value using the given options.', function (done) {
      assert.that(formats.isString('foobar', { minLength: 8 }), is.false());
      assert.that(formats.isString('foobar', { minLength: 5 }), is.true());
      done();
    });
  });
});
