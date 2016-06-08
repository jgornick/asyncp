import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function retry({ times = 5, interval = 0 }, task, ...args) {
    if (typeof interval != 'function') {
        interval = (function(interval) {
            return function() { return interval; };
        })(interval);
    }

    return new Array(times).fill(null)
        .reduce(
            (promise, item, index) => {
                return promise.then((results) => {
                    return tryFn(task, results, ...args)
                        .then((result) => {
                            throw new PromiseBreak(result);
                        })
                        .catch((error) => {
                            if (error instanceof PromiseBreak) {
                                throw error;
                            }

                            results.push(error);

                            if (index < (times - 1)) {
                                return new Promise(
                                    (resolve) => setTimeout(() => resolve(results), interval(index + 1))
                                );
                            }

                            throw error;
                        });
                });
            },
            Promise.resolve([])
        )
            .catch((error) => {
                if (error instanceof PromiseBreak) {
                    return Promise.resolve(error.value);
                }
                throw error;
            });
};