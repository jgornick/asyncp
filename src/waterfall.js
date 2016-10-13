import tryFn from './tryFn';
import promised from './promised';
import WaterfallError from './waterfallError';

export default promised(function waterfall(tasks, ...args) {
    if (!Array.isArray(tasks)) {
        return Promise.reject(new Error('First argument to waterfall must be an array of functions'))
    }

    let
        results = [];

    return tasks.reduce(
        (promise, task, index) => promise.then((promiseResults) => {
            return tryFn(task, ...promiseResults)
                .then((taskResults) => {
                    if (index == tasks.length - 1) {
                        return taskResults;
                    } else {
                        return results = Array.isArray(taskResults)
                            ? taskResults
                            : [taskResults];
                    }
                });
        }),
        Promise.resolve(args)
    )
        .catch((error) => {
            throw new WaterfallError(error.message, results);
        });
});
