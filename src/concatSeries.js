import tryFn from './tryFn';

export default function concatSeries(collection, iterator) {
    return collection.reduce(
        (promise, item) => promise.then((results) => {
            return tryFn(iterator, item)
                .then((result) => {
                    results.push(...result);
                    return results;
                });
        }),
        Promise.resolve([])
    );
};