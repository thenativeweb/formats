'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/email');

suite('email', function () {
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

    test('returns false for a non-email.', function (done) {
      assert.that(validator()(''), is.false());
      done();
    });

    test('returns true for an email.', function (done) {
      assert.that(validator()('jane.doe@example.com'), is.true());
      done();
    });
  });
});
