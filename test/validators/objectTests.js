'use strict';

var assert = require('assertthat');

var formats = require('../../lib/formats'),
    validator = require('../../lib/validators/object');

suite('object', function () {
  test('is a function.', function (done) {
    assert.that(validator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(validator()).is.ofType('function');
    done();
  });

  suite('basics', function () {
    test('returns false for a non-object.', function (done) {
      assert.that(validator()(23)).is.false();
      done();
    });

    test('returns false for null.', function (done) {
      assert.that(validator()(null)).is.false();
      done();
    });

    test('returns true for an object.', function (done) {
      assert.that(validator()({ foo: 'bar' })).is.true();
      done();
    });

    test('returns true for an empty object.', function (done) {
      assert.that(validator()({})).is.true();
      done();
    });

    suite('isOptional', function () {
      test('returns false for a missing mandatory object.', function (done) {
        assert.that(validator({ isOptional: false })(null)).is.false();
        done();
      });

      test('returns true for a missing optional object.', function (done) {
        assert.that(validator({ isOptional: true })(null)).is.true();
        done();
      });
    });

    suite('schema', function () {
      suite('simple values', function () {
        suite('single value', function () {
          test('returns false if the schema is not fulfilled.', function (done) {
            assert.that(validator({
              schema: {
                foo: formats.number()
              }
            })({
              foo: 'bar'
            })).is.false();
            done();
          });

          test('returns true if the schema is fulfilled.', function (done) {
            assert.that(validator({
              schema: {
                foo: formats.string()
              }
            })({
              foo: 'bar'
            })).is.true();
            done();
          });
        });

        suite('multiple values', function () {
          test('returns false if the schema is not fulfilled.', function (done) {
            assert.that(validator({
              schema: {
                foo: formats.string(),
                bar: formats.number()
              }
            })({
              foo: 'bar',
              bar: null
            })).is.false();
            done();
          });

          test('returns true if the schema is fulfilled.', function (done) {
            assert.that(validator({
              schema: {
                foo: formats.string(),
                bar: formats.number()
              }
            })({
              foo: 'bar',
              bar: 23
            })).is.true();
            done();
          });
        });
      });

      suite('complex values', function () {
        suite('single value', function () {
          test('returns false if the schema is not fulfilled.', function (done) {
            assert.that(validator({
              schema: {
                foo: formats.object()
              }
            })({
              foo: null
            })).is.false();
            done();
          });

          test('returns true if the schema is fulfilled.', function (done) {
            assert.that(validator({
              schema: {
                foo: formats.object({
                  schema: {
                    bar: formats.string()
                  }
                })
              }
            })({
              foo: {
                bar: 'baz'
              }
            })).is.true();
            done();
          });
        });
      });
    });

    suite('isSchemaRelaxed', function () {
      test('throws an error when no schema is given.', function (done) {
        assert.that(function () {
          validator({ isSchemaRelaxed: true })({
            foo: 'bar'
          });
        }).is.throwing('Schema is missing.');
        done();
      });

      test('returns false if set to false and the object contains more than the schema.', function (done) {
        assert.that(validator({
          schema: {
            foo: formats.string()
          },
          isSchemaRelaxed: false
        })({
          foo: 'bar',
          bar: 23
        })).is.false();
        done();
      });

      test('returns true if set to false and the object fulfills the schema.', function (done) {
        assert.that(validator({
          schema: {
            foo: formats.string(),
            bar: formats.number()
          },
          isSchemaRelaxed: false
        })({
          foo: 'bar',
          bar: 23
        })).is.true();
        done();
      });

      test('returns true if set to true and the object contains more than the schema.', function (done) {
        assert.that(validator({
          schema: {
            foo: formats.string()
          },
          isSchemaRelaxed: true
        })({
          foo: 'bar',
          bar: 23
        })).is.true();
        done();
      });

      test('returns true if set to true and the object fulfills the schema.', function (done) {
        assert.that(validator({
          schema: {
            foo: formats.string(),
            bar: formats.number()
          },
          isSchemaRelaxed: true
        })({
          foo: 'bar',
          bar: 23
        })).is.true();
        done();
      });
    });
  });

  suite('default', function () {
    test('returns the value if valid.', function (done) {
      assert.that(validator({ default: { foo: 'bar' }})({ foo: 'baz' })).is.equalTo({ foo: 'baz' });
      done();
    });

    test('returns the default value if not valid.', function (done) {
      assert.that(validator({ default: { foo: 'bar' }})(23)).is.equalTo({ foo: 'bar' });
      done();
    });
  });
});
