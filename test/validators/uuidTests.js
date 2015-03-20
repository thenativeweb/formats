'use strict';

var assert = require('assertthat');

var validator = require('../../lib/validators/uuid');

suite('uuid', function () {
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

    test('returns false for a non-uuid.', function (done) {
      assert.that(validator()('foobar')).is.false();
      done();
    });

    test('returns true for a uuid.', function (done) {
      assert.that(validator()('053767b2-470a-4d35-99b6-04afbce30ef9')).is.true();
      done();
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: '0b2e1fa1-1fa3-4380-a852-f4619b962411' })('10d3e136-fab2-4249-a4a8-d73a1382f832')).is.equalTo('10d3e136-fab2-4249-a4a8-d73a1382f832');
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: '3140232f-4b18-4757-a92f-e143f0683e8a' })(23)).is.equalTo('3140232f-4b18-4757-a92f-e143f0683e8a');
      done();
    });
  });
});
