# async-p

> This library is not production ready simply beacuse there aren't tests, documentation and missing implementations.

Port of the async.js API to use Promises instead of callbacks.

## Missing Implementations

The following methods are missing from async-p due to use of Promises. However, some methods that are missing provide value and should be implemented. Contributions are welcome!

### Collections

* ```forEachOf```, ```forEachOfSeries```, ```forEachOfLimit```
* ```filterLimit```
* ```rejectLimit```
* ```someLimit```
* ```everyLimit```

### Control Flow

* ```during```, ```doDuring```
* ```applyEach```, ```applyEachSeries```
* ```queue```, ```priorityQueue```
* ```cargo```
* ```auto```
* ```iterator```
* ```timesLimit```

### Utils

* ```apply```
* ```nextTick```
* ```memoize```
* ```unmemoize```
* ```ensureAsync```
* ```constant```
* ```asyncify```
* ```wrapSync```
* ```log```
* ```dir```
* ```noConflict```

## Credits

Much thanks to [Brian Cavalier](https://github.com/briancavalier) and others in the #cujojs room on freenode!

Also, thanks for [David Bushong](https://github.com/dbushong) for inspiration from his [async-q](https://github.com/dbushong/async-q) library.

## License

MIT.