import isPlainObject from './isPlainObject';
import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function retry(opts, ...args) {
    let task;

    if (typeof opts == 'function') {
        task = opts;
        opts = {
            times: 5,
            interval: 0
        };
    }

    if (!isPlainObject(opts)) {
        opts = {
            times: opts,
            interval: 0
        };
    }

    if (!Number.isInteger(opts.times)) {
        throw new Error(`Invalid times option value of "${opts.times}"`);
    }

    if (opts.interval == null) {
        opts.interval = 0;
    }

    if (typeof opts.interval != 'function') {
        opts.interval = (function(interval) {
            return function() { return interval; };
        })(opts.interval);
    }

    if (task == null) {
        task = args.shift();
    }

    return new Array(opts.times).fill(null)
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

                            if (index < (opts.times - 1)) {
                                return new Promise(
                                    (resolve) => setTimeout(() => resolve(results), opts.interval(index + 1, results))
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
