'use strict';

var assert = require('node-assertthat');

var formats = require('../lib/formats');

suite('formats', function () {
  test('is an object.', function (done) {
    assert.that(formats, is.ofType('object'));
    done();
  });

  test('has a getReturnValue function.', function (done) {
    assert.that(formats.getReturnValue, is.ofType('function'));
    done();
  });

  suite('contains validators', function () {
    test('alphanumeric.', function (done) {
      assert.that(formats.alphanumeric, is.ofType('function'));
      done();
    });

    test('boolean.', function (done) {
      assert.that(formats.boolean, is.ofType('function'));
      done();
    });

    test('custom.', function (done) {
      assert.that(formats.custom, is.ofType('function'));
      done();
    });

    test('email.', function (done) {
      assert.that(formats.email, is.ofType('function'));
      done();
    });

    test('function.', function (done) {
      assert.that(formats.function, is.ofType('function'));
      done();
    });

    test('ip.', function (done) {
      assert.that(formats.ip, is.ofType('function'));
      done();
    });

    test('number.', function (done) {
      assert.that(formats.number, is.ofType('function'));
      done();
    });

    test('object.', function (done) {
      assert.that(formats.object, is.ofType('function'));
      done();
    });

    test('string.', function (done) {
      assert.that(formats.string, is.ofType('function'));
      done();
    });

    test('uuid.', function (done) {
      assert.that(formats.uuid, is.ofType('function'));
      done();
    });
  });

  suite('contains is* validators', function () {
    test('alphanumeric.', function (done) {
      assert.that(formats.isAlphanumeric, is.ofType('function'));
      done();
    });

    test('boolean.', function (done) {
      assert.that(formats.isBoolean, is.ofType('function'));
      done();
    });

    test('custom.', function (done) {
      assert.that(formats.isCustom, is.ofType('function'));
      done();
    });

    test('email.', function (done) {
      assert.that(formats.isEmail, is.ofType('function'));
      done();
    });

    test('function.', function (done) {
      assert.that(formats.isFunction, is.ofType('function'));
      done();
    });

    test('ip.', function (done) {
      assert.that(formats.isIp, is.ofType('function'));
      done();
    });

    test('number.', function (done) {
      assert.that(formats.isNumber, is.ofType('function'));
      done();
    });

    test('object.', function (done) {
      assert.that(formats.isObject, is.ofType('function'));
      done();
    });

    test('string.', function (done) {
      assert.that(formats.isString, is.ofType('function'));
      done();
    });

    test('uuid.', function (done) {
      assert.that(formats.isUuid, is.ofType('function'));
      done();
    });
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
