import tryFn from './tryFn'

export default function series(tasks, ...args) {
    if (!Array.isArray(tasks)) {
        return Promise.reject(new Error('First argument to series must be an array of functions'))
    }

    return tasks.reduce(
        (promise, task) => promise.then((results) => {
            return tryFn(task, ...args)
                .then((result) => {
                    results.push(result);
                    return results;
                });
        }),
        Promise.resolve([])
    );
};
