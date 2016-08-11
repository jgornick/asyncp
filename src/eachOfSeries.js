import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function eachOfSeries(collection, iteratee) {
    return Object.keys(collection).reduce(
        (promise, key, index) => {
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
};
