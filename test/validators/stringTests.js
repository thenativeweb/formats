'use strict';

const assert = require('assertthat');

const validator = require('../../lib/validators/string');

suite('string', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator()).is.ofType('function');
    done();
  });

  test('throws on unknown properties.', function (done) {
    assert.that(function () {
      validator({ nonExistent: 'foobar' });
    }).is.throwing('Unknown property nonExistent.');
    done();
  });

  suite('basics', function () {
    test('returns false for a non-string.', function (done) {
      assert.that(validator()(23)).is.false();
      done();
    });

    test('returns true for a string.', function (done) {
      assert.that(validator()('foo')).is.true();
      done();
    });

    test('returns true for an empty string.', function (done) {
      assert.that(validator()('')).is.true();
      done();
    });

    suite('minLength', function () {
      test('returns false for a too short string.', function (done) {
        assert.that(validator({ minLength: 5 })('foo')).is.false();
        done();
      });

      test('returns true for a string long enough.', function (done) {
        assert.that(validator({ minLength: 5 })('foobar')).is.true();
        done();
      });
    });

    suite('maxLength', function () {
      test('returns false for a too long string.', function (done) {
        assert.that(validator({ maxLength: 5 })('foobar')).is.false();
        done();
      });

      test('returns true for a string short enough.', function (done) {
        assert.that(validator({ maxLength: 5 })('foo')).is.true();
        done();
      });
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: 'bar' })('foo')).is.equalTo('foo');
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: 'bar' })(23)).is.equalTo('bar');
      done();
    });
  });
});
