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

#### string

Validates that a value is of type `string`.

Options:

- `maxLength`: Validates that a value is at most `n` characters long.
- `minLength`: Validates that a value is at least `n` characters long.

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed formats and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
