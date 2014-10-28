'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/uuid');

suite('uuid', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-string.', function (done) {
      assert.that(validator()(23), is.false());
      done();
    });

    test('returns false for a non-uuid.', function (done) {
      assert.that(validator()('foobar'), is.false());
      done();
    });

    test('returns true for an uuid.', function (done) {
      assert.that(validator()('053767b2-470a-4d35-99b6-04afbce30ef9'), is.true());
      done();
    });
  });
});
