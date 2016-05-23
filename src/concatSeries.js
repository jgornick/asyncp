import tryFn from './tryFn';

export default function concatSeries(collection, iteratee) {
    return collection.reduce(
        (promise, item) => promise.then((results) => {
            return tryFn(iteratee, item)
                .then((result) => {
                    results.push(...result);
                    return results;
                });
        }),
        Promise.resolve([])
    );
};