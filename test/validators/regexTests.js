'use strict';

var assert = require('assertthat');

var validator = require('../../lib/validators/regex');

suite('regex', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('throws an error if options are missing.', function (done) {
    assert.that(function () {
      validator();
    }).is.throwing('Options are missing.');
    done();
  });

  test('throws an error if regex is missing.', function (done) {
    assert.that(function () {
      validator({});
    }).is.throwing('Regular expression is missing.');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator({ expression: /foo/ })).is.ofType('function');
    done();
  });

  suite('basics', function () {
    suite('expression', function () {
      test('returns false if the regex does not match.', function (done) {
        assert.that(validator({ expression: /^foo$/ })('foobar')).is.false();
        done();
      });

      test('returns true if the regex matches.', function (done) {
        assert.that(validator({ expression: /^foo/ })('foobar')).is.true();
        done();
      });
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ expression: /^foo/, default: 'bas' })('foobar')).is.equalTo('foobar');
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ expression: /^foo$/, default: 'bas' })('foobar')).is.equalTo('bas');
      done();
    });
  });
});
