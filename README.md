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

## Credits

Much thanks to [Brian Cavalier](https://github.com/briancavalier) and others in the #cujojs room on freenode!

Also, thanks for [David Bushong](https://github.com/dbushong) for inspiration from his [async-q](https://github.com/dbushong/async-q) library.

## License

MIT.