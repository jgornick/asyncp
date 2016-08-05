import tryFn from './tryFn';

export default function applyEachSeries(collection, ...args) {
    return collection.reduce(
        (promise, f) => {
            return promise.then((results) => {
                return tryFn(f, ...args)
                    .then((result) => {
                        results.push(result);
                        return results;
                    });
            });
        },
        Promise.resolve([])
    );
};
