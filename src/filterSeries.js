import tryFn from './tryFn';
import promised from './promised';

export default promised(function filterSeries(collection, predicate) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((results) => {
                return tryFn(predicate, item, index, collection)
                    .then((result) => {
                        if (result === true) {
                            results.push(item);
                        }
                        return results;
                    });
            });
        },
        Promise.resolve([])
    );
});
