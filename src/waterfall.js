import tryFn from './tryFn';
import WaterfallError from './waterfallError';

export default function waterfall(tasks, ...args) {
    let
        results = [];

    return tasks.reduce(
        (promise, task) => promise.then((promiseResults) => {
            return tryFn(task, ...promiseResults)
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