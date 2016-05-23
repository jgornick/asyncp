import PromiseBreak from './promiseBreak';

export default function eachSeries(collection, iteratee) {
    let
        results = [];

    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((results) => {
                return Promise.resolve(iteratee(item, index, collection))
                    .then((result) => {
                        if (result === false) {
                            return Promise.reject(new PromiseBreak(item));
                        }
                        results.push(result);
                        return results;
                    });
            });
        },
        Promise.resolve(results)
    )
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(results);
            }
            throw error;
        });
};