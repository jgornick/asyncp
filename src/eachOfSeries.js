import tryFn from './tryFn';
import promised from './promised';

export default promised(function eachOfSeries(collection, iteratee) {
    return Object.keys(collection).reduce(
        (promise, key) => {
            let collectionValue = collection[key];
            return promise.then(result =>
                tryFn(iteratee, collectionValue, key, collection)
                    .then(value => {
                        result[key] = value;
                        return result;
                    })
            )
        },
        Promise.resolve({})
    );
});
