# async-p

> This library is not production ready simply beacuse there aren't tests, documentation and missing implementations.

Port of the async.js API to use Promises instead of callbacks.

## Missing Implementations

The following methods are missing from async-p due to use of Promises. However, some methods that are missing provide value and should be implemented. Contributions are welcome!

### Collections

* ```transform```

### Control Flow

* ```queue```
* ```priorityQueue```
* ```cargo```
* ```auto```
* ```autoInject```
* ```iterator``` => Use generators.

### Utils

* ```apply``` => Use native function.apply.
* ```race``` => Use Promise.race.
* ```nextTick```
* ```memoize``` => A Promise can only be resolved once which means the result is already cached. Alternatively, use lodash#memoize.
* ```unmemoize```
* ```ensureAsync```
* ```constant``` => Alternatively, use lodash#constant.
* ```asyncify```
* ```log```
* ```dir```
* ```noConflict```
* ```reflect```
* ```reflectAll```

## "Gotchas"

* When using collection functions (`each`, `eachOf`, `detect`, etc...), the `collection` passed into the `iteratee` is a *reference*. This means that for each iteration, it's possible to modify the source collection. It's recommended to use the the `collection` as a read-only reference. This is especially important with `*Series` and `*Limit` methods as the `iteratee` is *not* called in the same tick as the original function call.

## Credits

Much thanks to [Brian Cavalier](https://github.com/briancavalier) and others in the #cujojs room on freenode!

Also, thanks for [David Bushong](https://github.com/dbushong) for inspiration from his [async-q](https://github.com/dbushong/async-q) library.

## License

MIT.
