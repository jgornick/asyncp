import tryFn from './tryFn';
import promised from './promised';

export default promised(function reduce(collection, result, iteratee) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((result) => tryFn(iteratee, result, item, index, collection));
        },
        Promise.resolve(result)
    );
});
