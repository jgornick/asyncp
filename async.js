import throat from 'throat';
import PromiseBreak from './promise-break';
import WaterfallError from './waterfall-error';

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
        return Promise.resolve(predicate(item, index, collection))
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
                return Promise.resolve(iterator(item, index, collection))
                    .then((result) => [result, item]);
            }
        ))
        .then((collection) => collection.sort(sorter).map((item) => item[1]));
};

export function some(collection, predicate) {
    return Promise.all(collection.map((item, index, collection) => {
        return Promise.resolve(predicate(item, index, collection))
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
        return Promise.resolve(predicate(item, index, collection))
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
        return Promise.resolve(iterator(item, index, collection)).then((result) => results.push(...result));
    }))
        .then(() => results);
};

export function concatSeries(collection, iterator) {
    return collection.reduce(
        (promise, item) => promise.then((results) => {
            return Promise.resolve(iterator(item))
                .then((result) => {
                    results.push(...result);
                    return results;
                });
        }),
        Promise.resolve([])
    )
};

export function series(tasks) {
    return tasks.reduce(
        (promise, task) => promise.then((results) => {
            return Promise.resolve(task())
                .then((result) => {
                    results.push(result);
                    return results;
                });
        }),
        Promise.resolve([])
    );
};

export function parallel(tasks) {
    return Promise.all(tasks.map((task) => task()));
};

export function parallelLimit(tasks, limit) {
    return Promise.all(tasks.map(throat(limit, (task) => task())));
};

export function whilst(condition, task) {
    return Promise.resolve(condition())
        .then((conditionResult) => {
            return conditionResult
                ? Promise.resolve(task()).then(() => whilst(condition, task))
                : Promise.resolve();
        });
};

export function doWhilst(task, condition) {
    return Promise.resolve(task()).then(() => whilst(condition, task));
};


export function until(condition, task) {
    return Promise.resolve(condition())
        .then((conditionResult) => {
            return conditionResult
                ? Promise.resolve()
                : Promise.resolve(task()).then(() => until(condition, task));
        });
};

export function doUntil(task, condition) {
    return Promise.resolve(task()).then(() => until(condition, task));
};

export function forever(task, ...args) {
    return Promise.resolve(task(...args)).then((...results) => forever(task, ...results));
};

export function waterfall(tasks) {
    let
        results = [];

    return tasks.reduce(
        (promise, task) => promise.then((promiseResults) => {
            return Promise.resolve(task(...promiseResults))
                .then((taskResults) => {
                    return results = taskResults;
                });
        }),
        Promise.resolve(results)
    )
        .catch((error) => {
            let waterfallError = new WaterfallError();
            waterfallError.message = error.message;
            waterfallError.results = results;
            throw waterfallError;
        });
};