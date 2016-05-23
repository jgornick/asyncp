export default function reduce(collection, result, iteratee) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((result) => iteratee(result, item, index, collection));
        },
        Promise.resolve(result)
    );
};