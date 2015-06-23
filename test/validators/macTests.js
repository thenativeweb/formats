'use strict';

var assert = require('assertthat');

var validator = require('../../lib/validators/mac');

suite('mac', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator()).is.ofType('function');
    done();
  });

  suite('basics', function () {
    test('returns false for a non-string.', function (done) {
      assert.that(validator()(23)).is.false();
      done();
    });

    test('returns false for a non-MAC address.', function (done) {
      assert.that(validator()('foobar')).is.false();
      done();
    });

    test('returns true for a MAC address with colons.', function (done) {
      assert.that(validator()('12:34:56:78:9a:cd')).is.true();
      done();
    });

    test('returns true for a MAC address with hyphens.', function (done) {
      assert.that(validator()('12-34-56-78-9a-cd')).is.true();
      done();
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: '00:00:00:00:00:00' })('12:34:56:78:9a:cd')).is.equalTo('12:34:56:78:9a:cd');
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: '00:00:00:00:00:00' })('foobar')).is.equalTo('00:00:00:00:00:00');
      done();
    });
  });
});
