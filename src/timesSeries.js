import tryFn from './tryFn';

export default function timesSeries(n, callback, ...args) {
    return new Array(n).fill()
        .reduce(
            (promise, item, index) => {
                return promise.then((results) => {
                    return tryFn(callback, index, ...args)
                        .then((result) => {
                            results.push(result);
                            return results;
                        });
                });
            },
            Promise.resolve([])
        );
};