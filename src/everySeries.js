import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function everySeries(collection, predicate) {
    return collection.reduce(
        (promise, ...args) => {
            return promise.then(() => {
                return tryFn(predicate, ...args)
                    .then((result) => {
                        if (result === false) {
                            return Promise.reject(new PromiseBreak(false));
                        }
                        return promise;
                    });
            });
        },
        Promise.resolve()
    )
        .then(() => true)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};
