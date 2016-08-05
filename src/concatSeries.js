import tryFn from './tryFn';

export default function concatSeries(collection, iteratee) {
    return collection.reduce(
        (promise, item, index, collection) => promise.then((results) => {
            return tryFn(iteratee, item, index, collection)
                .then((result) => results.concat(result));
        }),
        Promise.resolve([])
    );
};
