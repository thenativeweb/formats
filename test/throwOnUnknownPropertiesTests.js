'use strict';

const assert = require('assertthat');

const throwOnUnknownProperties = require('../lib/throwOnUnknownProperties');

suite('throwOnUnknownProperties', function () {
  test('is a function.', function (done) {
    assert.that(throwOnUnknownProperties).is.ofType('function');
    done();
  });

  test('throws if options are missing.', function (done) {
    assert.that(function () {
      throwOnUnknownProperties();
    }).is.throwing('Options are missing.');
    done();
  });

  test('throws if properties are missing.', function (done) {
    assert.that(function () {
      throwOnUnknownProperties({ foo: 'bar' });
    }).is.throwing('Properties are missing.');
    done();
  });

  test('throws if options have properties not expected.', function (done) {
    assert.that(function () {
      throwOnUnknownProperties({ foo: 'bar' }, [ 'baz' ]);
    }).is.throwing('Unknown property foo.');
    done();
  });

  test('does not throw if options have properties as expected.', function (done) {
    assert.that(function () {
      throwOnUnknownProperties({ foo: 'bar' }, [ 'foo' ]);
    }).is.not.throwing();
    done();
  });

  test('does not throw if options have less properties than expected.', function (done) {
    assert.that(function () {
      throwOnUnknownProperties({ foo: 'bar' }, [ 'foo', 'baz' ]);
    }).is.not.throwing();
    done();
  });
});
