import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function detectSeries(collection, predicate, notFound = undefined) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then(() => {
                return tryFn(predicate, item, index, collection)
                    .then((result) => {
                        if (result === true) {
                            return Promise.reject(new PromiseBreak(item));
                        }
                        return promise;
                    });
            });
        },
        Promise.resolve()
    )
        .then(() => notFound)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};
