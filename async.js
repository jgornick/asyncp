import throat from 'throat';
import PromiseBreak from './promise-break';
import WaterfallError from './waterfall-error';

function promiseTry(fn, ...args) {
    try {
        return Promise.resolve(fn(...args));
    } catch (error) {
        return Promise.reject(error);
    }
}

function generateReducer(callback, callbackThen) {
    return (promise, item, index, collection) => {
        return promise.then((results) => {
            return Promise.resolve(callback(item, index, collection))
                .then((result) => callbackThen(results, result, item, index, collection));
        });
    };
};

function eachSeriesReducer(iterator) {
    return generateReducer(
        iterator,
        (results, result, item, index, collection) => {
            if (result === false) {
                return Promise.reject(new PromiseBreak({ item, index, collection }));
            }
            results.push(result);
            return results;
        }
    );
};

function mapSeriesReducer(iterator) {
    return generateReducer(
        iterator,
        (results, result, item, index, collection) => {
            results.push(result);
            return results;
        }
    );
};

function filterSeriesReducer(iterator) {
    return generateReducer(
        iterator,
        (results, result, item, index, collection) => {
            if (result === true) {
                results.push(item);
            }
            return results;
        }
    );
};

function rejectSeriesReducer(iterator) {
    return generateReducer(
        iterator,
        (results, result, item, index, collection) => {
            if (result === false) {
                results.push(item);
            }
            return results;
        }
    );
};

function detectSeriesReducer(predicate) {
    return (promise, item, index, collection) => {
        return promise.then((results) => {
            return Promise.resolve(predicate(item, index, collection))
                .then((result) => {
                    if (result === true) {
                        return Promise.reject(new PromiseBreak(item));
                    }
                    return results;
                });
        });
    };
};

///////////////////////////////////////////////////////////////////////////////

export function each(collection, iterator) {
    return Promise.all(collection.map(iterator));
};

export function eachSeries(collection, iterator) {
    let
        results = [];

    return collection
        .reduce(eachSeriesReducer(iterator), Promise.resolve(results))
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(results);
            }
            throw error;
        });
};

export function eachLimit(collection, limit, iterator) {
    return Promise.all(collection.map(throat(limit, iterator)));
};

export function map(collection, iterator) {
    return each(collection, iterator);
};

export function mapSeries(collection, iterator) {
    return collection.reduce(mapSeriesReducer(iterator), Promise.resolve([]))
};

export function mapSeriesLimit(collection, iterator) {
    return eachLimit(collection, iterator);
};

export function filter(collection, predicate) {
    return each(collection, predicate)
        .then((results) => collection.filter((file, index) => results[index]));
};

export function filterSeries(collection, predicate) {
    return collection.reduce(filterSeriesReducer(predicate), Promise.resolve([]))
};

export function reject(collection, predicate) {
    return each(collection, predicate)
        .then((results) => collection.filter((file, index) => !results[index]));
};

export function rejectSeries(collection, predicate) {
    return collection.reduce(rejectSeriesReducer(predicate), Promise.resolve([]))
};

export function reduce(collection, result, iterator) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((result) => iterator(result, item, index, collection));
        },
        Promise.resolve(result)
    );
};

export function reduceRight(collection, result, iterator) {
    return collection.reduceRight(
        (promise, item, index, collection) => {
            return promise.then((result) => iterator(result, item, index, collection));
        },
        Promise.resolve(result)
    );
};

export function detect(collection, predicate, notFound = undefined) {
    return Promise.all(collection.map((item, index, collection) => {
        return promiseTry(predicate, item, index, collection)
            .then((result) => {
                if (result === true) {
                    return Promise.reject(new PromiseBreak(item));
                }
                return result;
            });
    }))
        .then(() => notFound)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};

export function detectSeries(collection, predicate, notFound = undefined) {
    return collection.reduce(detectSeriesReducer(predicate), Promise.resolve())
        .then(() => notFound)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};

export function sortBy(collection, iterator, sorter) {
    if (sorter == null) {
        sorter = (a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    }

    return Promise
        .all(collection.map(
            (item, index, collection) => {
                return promiseTry(iterator, item, index, collection)
                    .then((result) => [result, item]);
            }
        ))
        .then((collection) => collection.sort(sorter).map((item) => item[1]));
};

export function some(collection, predicate) {
    return Promise.all(collection.map((item, index, collection) => {
        return promiseTry(predicate, item, index, collection)
            .then((result) => {
                if (result === true) {
                    return Promise.reject(new PromiseBreak(true));
                }
                return result;
            });
    }))
        .then(() => false)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};

export function every(collection, predicate) {
    return Promise.all(collection.map((item, index, collection) => {
        return promiseTry(predicate, item, index, collection)
            .then((result) => {
                if (result === false) {
                    return Promise.reject(new PromiseBreak(false));
                }
                return result;
            });
    }))
        .then(() => true)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};

export function concat(collection, iterator) {
    let
        results = [];

    return Promise.all(collection.map((item, index, collection) => {
        return promiseTry(iterator, item, index, collection)
            .then((result) => results.push(...result));
    }))
        .then(() => results);
};

export function concatSeries(collection, iterator) {
    return collection.reduce(
        (promise, item) => promise.then((results) => {
            return promiseTry(iterator, item)
                .then((result) => {
                    results.push(...result);
                    return results;
                });
        }),
        Promise.resolve([])
    )
};

export function series(tasks, ...args) {
    return tasks.reduce(
        (promise, task) => promise.then((results) => {
            return promiseTry(task, ...args)
                .then((result) => {
                    results.push(result);
                    return results;
                });
        }),
        Promise.resolve([])
    );
};

export function parallel(tasks, ...args) {
    return Promise.all(tasks.map((task) => promiseTry(task, ...args)));
};

export function parallelLimit(tasks, limit, ...args) {
    return Promise.all(tasks.map(throat(limit, (task) => promiseTry(task, ...args))));
};

export function whilst(condition, task, ...args) {
    return promiseTry(condition)
        .then((conditionResult) => {
            return conditionResult
                ? promiseTry(task, ...args).then(() => whilst(condition, task, ...args))
                : Promise.resolve();
        });
};

export function doWhilst(task, condition, ...args) {
    return promiseTry(task, ...args).then(() => whilst(condition, task, ...args));
};


export function until(condition, task, ...args) {
    return promiseTry(condition)
        .then((conditionResult) => {
            return conditionResult
                ? Promise.resolve()
                : promiseTry(task, ...args).then(() => until(condition, task, ...args));
        });
};

export function doUntil(task, condition, ...args) {
    return promiseTry(task, ...args).then(() => until(condition, task));
};

export function forever(task, ...args) {
    return promiseTry(task, ...args).then((...results) => forever(task, ...results));
};

export function waterfall(tasks, ...args) {
    let
        results = [];

    return tasks.reduce(
        (promise, task) => promise.then((promiseResults) => {
            return promiseTry(task, ...promiseResults)
                .then((taskResults) => {
                    return results = Array.isArray(taskResults)
                        ? taskResults
                        : [taskResults];
                });
        }),
        Promise.resolve(args)
    )
        .catch((error) => {
            let waterfallError = new WaterfallError();
            waterfallError.message = error.message;
            waterfallError.results = results;
            throw waterfallError;
        });
};

export function retry(times = 5, task, ...args) {
    return new Array(times).fill(null)
        .reduce(
            (promise, item, index) => {
                return promise.then(() => {
                    return promiseTry(task, ...args)
                        .then((result) => {
                            throw new PromiseBreak(result);
                        })
                        .catch((error) => {
                            if (index < (times - 1)) {
                                return Promise.resolve();
                            }

                            throw error;
                        });
                });
            },
            Promise.resolve()
        )
            .catch((error) => {
                if (error instanceof PromiseBreak) {
                    return Promise.resolve(error.value);
                }
                throw error;
            });
};

export function times(n, callback, ...args) {
    return Promise.all(new Array(n).fill(null).map((item, index) => promiseTry(callback, index, ...args)));
};

export function timesSeries(n, callback, ...args) {
    return new Array(n).fill(null)
        .reduce(
            (promise, item, index) => {
                return promise.then((results) => {
                    return promiseTry(callback, index, ...args)
                        .then((result) => {
                            results.push(result);
                            return results;
                        });
                });
            },
            Promise.resolve([])
        );
};