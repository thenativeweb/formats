'use strict';

var assert = require('node-assertthat');

var validator = require('../../lib/validators/function');

suite('function', function () {
  test('is a function.', function (done) {
    assert.that(validator, is.ofType('function'));
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator(), is.ofType('function'));
    done();
  });

  suite('basics', function () {
    test('returns false for a non-function.', function (done) {
      assert.that(validator()('foo'), is.false());
      done();
    });

    test('returns true for a function.', function (done) {
      assert.that(validator()(function () {}), is.true());
      done();
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      var defaultFunction = function () {
        return 42;
      };

      var inputFunction = function () {
        return 23;
      };

      assert.that(validator({ default: defaultFunction })(inputFunction), is.equalTo(inputFunction));
      done();
    });

    test('returns the default value if not valid.', function (done) {
      var defaultFunction = function () {
        return 23;
      };

      assert.that(validator({ default: defaultFunction })(23), is.equalTo(defaultFunction));
      done();
    });
  });
});
