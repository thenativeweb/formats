'use strict';

var assert = require('assertthat');

var validator = require('../../lib/validators/ip');

suite('ip', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator()).is.ofType('function');
    done();
  });

  suite('basics', function () {
    test('returns false for a non-ip address.', function (done) {
      assert.that(validator()(23)).is.false();
      done();
    });

    test('returns true for an ipv4 address.', function (done) {
      assert.that(validator()('192.168.0.1')).is.true();
      done();
    });

    test('returns true for an ipv6 address.', function (done) {
      assert.that(validator()('0:0:0:0:0:ffff:c0a8:1')).is.true();
      done();
    });

    suite('version', function () {
      test('returns false for an ipv4 when ipv6 is requested.', function (done) {
        assert.that(validator({ version: 6 })('192.168.0.1')).is.false();
        done();
      });

      test('returns true for an ipv4 when ipv4 is requested.', function (done) {
        assert.that(validator({ version: 4 })('192.168.0.1')).is.true();
        done();
      });

      test('returns false for an ipv6 when ipv4 is requested.', function (done) {
        assert.that(validator({ version: 4 })('0:0:0:0:0:ffff:c0a8:1')).is.false();
        done();
      });

      test('returns true for an ipv6 when ipv6 is requested.', function (done) {
        assert.that(validator({ version: 6 })('0:0:0:0:0:ffff:c0a8:1')).is.true();
        done();
      });
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: '127.0.0.1' })('192.168.0.1')).is.equalTo('192.168.0.1');
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: '127.0.0.1' })(23)).is.equalTo('127.0.0.1');
      done();
    });
  });
});
