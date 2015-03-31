# Async.js to the Promise Land

The following is an exercise that will translate the methods in the Async.js API to use Promises.

## Control flow methods not implemented

* applyEach(fns, args..., callback)
    * This translates to async.parallel(fns, ...args)
* applyEachSeries(fns, args..., callback)
    * This translates to async.series(fns, ...args)
* queue
* priorityQueue
* cargo
* auto
* iterator
* apply
* nextTick

## Utils not implemented

* memoize
* unmemoize
* log
* dir
* noConflict