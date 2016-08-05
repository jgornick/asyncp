import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function eachOfSeries(collection, iteratee) {
    return Object.keys(collection)
        .reduce(
            (promise, key, index, collection) => {
                return promise.then(() => {
                    return tryFn(iteratee, collection[key], key, collection)
                        .then((result) => {
                            if (result === false) {
                                return Promise.reject(new PromiseBreak());
                            }
                        });
                });
            },
            Promise.resolve()
        )
        .then(() => collection)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(collection);
            }
            throw error;
        });
};
