import tryFn from './tryFn';
import promised from './promised';

export default promised(function concatSeries(collection, iteratee) {
    return collection.reduce(
        (promise, item, index, collection) => promise.then((results) => {
            return tryFn(iteratee, item, index, collection)
                .then((result) => results.concat(result));
        }),
        Promise.resolve([])
    );
});
