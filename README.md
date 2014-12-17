# formats

formats is a collection of validators.

## Installation

    $ npm install formats

## Quick start

First you need to add a reference to formats in your application.

```javascript
var formats = require('formats');
```

### Validating values

Basically, to validate a value you need to call the appropriate function on the `formats` object, e.g. `string`. The result is a validator function that you can re-use multiple times.

```javascript
var stringValidator = formats.string();
console.log(stringValidator('foobar')); // => true
```

Some validators are customizable. For that provide an `options` object when requesting the validator.

```javascript
var stringValidator = formats.string({ minLength: 7 });
console.log(stringValidator('foobar')); // => false
```

#### Working with default values

From time to time you may be interested in the actual value instead of a boolean (or a default value in case of an invalid value). In these cases, specify the `default` option.

```javascript
var stringValidator = formats.string({ minLength: 7, default: 'formats' });
console.log(stringValidator('foobarbaz')); // => 'foobarbaz'
console.log(stringValidator('foobar'));    // => 'formats'
```

Although not explicitly described below, the `default` option is available for every validator.

### Using built-in validators

#### alphanumeric

Validates that a value is of type `string` that contains only alphanumeric characters.

##### Options

- `minLength`: Validates that a value is at least `n` characters long.
- `maxLength`: Validates that a value is at most `n` characters long.

##### Sample

```javascript
var validator = formats.alphanumeric({
  minLength: 5,
  maxLength: 23
});
```

#### boolean

Validates that a value is of type `boolean`.

##### Sample

```javascript
var validator = formats.boolean();
```

#### email

Validates that a value is an email address, according to the [W3C HTML5 specification](http://www.w3.org/TR/html5/forms.html#valid-e-mail-address).

##### Sample

```javascript
var validator = formats.email();
```

#### function

Validates that a value is of type `function`.

##### Sample

```javascript
var validator = formats.function();
```

#### ip

Validates that a value is an ip address.

##### Options

- `version`: Validates that a value is a version `4` or version `6` address.

##### Sample

```javascript
var validator = formats.ip({
  version: 4
});
```

#### number

Validates that a value is of type `number`.

##### Options

- `isInteger`: Validates that a value is an integer.
- `min`: Validates that a value is at least `n`.
- `max`: Validates that a value is at most `n`.

##### Sample

```javascript
var validator = formats.number({
  isInteger: true,
  min: 5,
  max: 23
});
```

#### object

Validates that a value is of type `object`.

##### Options

- `isOptional`: Validates that a value may be `null`.
- `schema`: Validates that a value fulfills a schema.
- `isSchemaRelaxed`: Validates that a value may contain additional properties that are not described by the schema.

##### Sample

```javascript
var validator = formats.object({
  isOptional: false,
  schema: {
    foo: formats.number(),
    bar: formats.string()
  },
  isSchemaRelaxed: false
});
```

#### string

Validates that a value is of type `string`.

##### Options

- `minLength`: Validates that a value is at least `n` characters long.
- `maxLength`: Validates that a value is at most `n` characters long.

##### Sample

```javascript
var validator = formats.string({
  minLength: 5,
  maxLength: 23
});
```

#### uuid

Validates that a value is a uuid.

##### Sample

```javascript
var validator = formats.uuid();
```

### Using custom validators

If you want to validate a value, but there is no matching built-in validator, you may use a custom validator.

A custom validator is a function that returns a validator function that returns `true` if the specified value is valid, and `false` otherwise. Once you have defined the custom validator, you can use it by providing it to the `custom` function.

```javascript
var getReturnValue = require('formats').getReturnValue;

var range = function (options) {
  options = options || {};
  options.min = options.min || Number.NEGATIVE_INFINITY;
  options.max = options.max || Number.POSITIVE_INFINITY;

  return function (value) {
    var returnValue = getReturnValue(value, options);

    if (typeof value !== 'number') {
      return returnValue.false;
    }

    if (value < options.min) {
      return returnValue.false;
    }

    if (value > options.max) {
      return returnValue.false;
    }

    return returnValue.true;
  };
};

var rangeValidator = formats.custom(range({ min: 5, max: 23 }));
console.log(rangeValidator(42)); // => false
```

### Using is* validator functions

If you directly want to validate a value and skip the creation of a validator function, use the appropriate `is*` function, e.g. `isString`. These functions take the value as first parameter, and options as second.

```javascript
console.log(formats.isString('foobar', { minLength: 7 })); // => false
```

You may also use the `default` option as described above with the is* validator functions.

```javascript
console.log(formats.isString('foobarbaz', { minLength: 7, default: 'formats' })); // => 'foobarbaz'
console.log(formats.isString('foobar', { minLength: 7, default: 'formats' }));    // => 'formats'
```

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed formats and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
