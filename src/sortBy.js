import tryFn from './tryFn';
import promised from './promised';

export default promised(function sortBy(collection, iteratee, comparator) {
    if (comparator == null) {
        comparator = (a, b) => a < b ? -1 : a > b ? 1 : 0;
    }

    return Promise.all(collection.map((item, index, collection) =>
        tryFn(iteratee, item, index, collection)
            .then((result) => [result, item])
    ))
        .then((results) => results.sort(([a], [b]) => comparator(a, b)).map(([_, item]) => item));
});
