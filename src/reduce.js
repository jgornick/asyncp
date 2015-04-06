export default function reduce(collection, result, iterator) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((result) => iterator(result, item, index, collection));
        },
        Promise.resolve(result)
    );
};