# asyncp

[![Travis CI Build Status](https://travis-ci.org/jgornick/asyncp.svg?branch=master)](https://travis-ci.org/jgornick/asyncp) [![Coverage Status](https://coveralls.io/repos/github/jgornick/asyncp/badge.svg?branch=master)](https://coveralls.io/github/jgornick/asyncp?branch=master) [![npm version](https://badge.fury.io/js/asyncp.svg)](https://badge.fury.io/js/asyncp) [![Dependency Status](https://david-dm.org/jgornick/asyncp.svg)](https://david-dm.org/jgornick/asyncp) [![Join the chat at https://gitter.im/jgornick/asyncp](https://badges.gitter.im/jgornick/asyncp.svg)](https://gitter.im/jgornick/asyncp)

asyncp is a port of the [async](https://github.com/caolan/async) library to use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instead of [Node.js callbacks](http://nodeguide.com/style.html#callbacks).

## Installation

```
npm install asyncp
```

You could also download an archive (zip or tar.gz) from the [asyncp Github Releases](https://github.com/jgornick/asyncp/releases).

## Node.js & Browser

Currently, asyncp has been tested against Node.js 4.x and 6.x. asyncp is written in ES2015, but transpiled to ES5 using [Babel](http://babeljs.io/). The distributed npm package contains only ES5 source code.

> TODO: The npm package is also distributed with a single complete file of asyncp and a single minified file of asyncp. The complete files are located in `asyncp/dist/asyncp{.min}.js`.

Another benefit of asyncp is that it uses the native Promise implementation. This means you can use the native implementation or another library that implements/shims the [Promise/A+](https://promisesaplus.com/) specification (e.g. [When.js](https://github.com/cujojs/when), [Bluebird](https://github.com/petkaantonov/bluebird/), [Q](https://github.com/kriskowal/q)).

## Usage

```
const async = require('asyncp');
const p = async.map([1, 2, 3], value => {
    switch (value) {
        // delayed promise
        case 1:
            return new Promise(resolve => setTimeout(resolve.bind(null, value), 25));
        // sync promise
        case 2:
            return new Promise(resolve => resolve(value));
        // sync return
        case 3:
            return value;
    }
});

p.then(console.log); // [1, 2, 3];
```

Or, you can require/import individual functions:

```
const map = require('asyncp/map');
const p = map([1, 2, 3], value => {
    switch (value) {
        // delayed promise
        case 1:
            return new Promise(resolve => setTimeout(resolve.bind(null, value), 25));
        // sync promise
        case 2:
            return new Promise(resolve => resolve(value));
        // sync return
        case 3:
            return value;
    }
});

p.then(console.log); // [1, 2, 3];
```

## Documentation

API documentation is coming soon, but...

Because this is a port of the [async](https://github.com/caolan/async) library, the API _should_ be the same. Existing async documentation can be found [here](http://caolan.github.io/async/). The biggest difference is that there won't be a final callback argument. Instead of the callback, the resolved Promise is equivalent.

Another difference is when an async iteratee, task, callback, etc... could allow multiple result arguments, they will be represented as an array of results in the resolved Promise. This concept is similar to [Bluebird.spread](http://bluebirdjs.com/docs/api/spread.html).

## Missing Implementations

The following functions in [async](https://github.com/caolan/async) are missing from asyncp. Some of the functions are not all that useful when working with Promises, but contributions are welcome!

### Control Flow

* [```auto```](http://caolan.github.io/async/docs.html#.auto)
* [```autoInject```](http://caolan.github.io/async/docs.html#.autoInject)
* [```cargo```](http://caolan.github.io/async/docs.html#.cargo)
* [```priorityQueue```](http://caolan.github.io/async/docs.html#.priorityQueue)
* [```race```](http://caolan.github.io/async/docs.html#.race) => Use [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
* [```queue```](http://caolan.github.io/async/docs.html#.queue)

### Utils

* [```apply```](http://caolan.github.io/async/docs.html#.apply) => Use [function.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
* [```asyncify```](http://caolan.github.io/async/docs.html#.asyncify)
* [```constant```](http://caolan.github.io/async/docs.html#.constant) => Use [lodash#constant](https://lodash.com/docs#constant).
* [```dir```](http://caolan.github.io/async/docs.html#.dir)
* [```ensureAsync```](http://caolan.github.io/async/docs.html#.ensureAsync)
* [```log```](http://caolan.github.io/async/docs.html#.log)
* [```memoize```](http://caolan.github.io/async/docs.html#.memoize) => Use [lodash#memoize](https://lodash.com/docs#memoize)
* [```nextTick```](http://caolan.github.io/async/docs.html#.nextTick)
* [```reflectAll```](http://caolan.github.io/async/docs.html#.reflectAll)
* [```reflect```](http://caolan.github.io/async/docs.html#.reflect)
* [```setImmediate```](http://caolan.github.io/async/docs.html#.setImmediate)
* [```unmemoize```](http://caolan.github.io/async/docs.html#.unmemoize)

## "Gotchas"

* When using collection functions (`each`, `eachOf`, `detect`, etc...), the `collection` passed into the `iteratee` is a *reference*. This means that for each iteration, it's possible to modify the source collection. It's recommended to use the the `collection` as a read-only reference. This is especially important with `*Series` and `*Limit` methods as the `iteratee` is *not* called in the same tick as the original function call.

## Credits

Much thanks to [Brian Cavalier](https://github.com/briancavalier) and others in the #cujojs room on freenode!

Also, thanks for [David Bushong](https://github.com/dbushong) for inspiration from his [async-q](https://github.com/dbushong/async-q) library.

## License

[MIT](LICENSE)
