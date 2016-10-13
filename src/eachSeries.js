import tryFn from './tryFn';
import promised from './promised';

export default promised(function eachSeries(collection, iteratee) {
    return collection.reduce(
        (promise, ...args) => {
            return promise.then((results) => {
                return tryFn(iteratee, ...args)
                    .then((result) => {
                        results.push(result);
                        return results;
                    });
            });
        },
        Promise.resolve([])
    );
});
