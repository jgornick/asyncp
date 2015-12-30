import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function retry(times = 5, task, ...args) {
    return new Array(times).fill(null)
        .reduce(
            (promise, item, index) => {
                return promise.then(() => {
                    return tryFn(task, ...args)
                        .then((result) => {
                            throw new PromiseBreak(result);
                        })
                        .catch((error) => {
                            if (error instanceof PromiseBreak) {
                                throw error;
                            }

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