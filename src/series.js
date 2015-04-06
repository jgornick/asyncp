import tryFn from './tryFn'

export default function series(tasks, ...args) {
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