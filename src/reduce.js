import tryFn from './tryFn';

export default function reduce(collection, result, iteratee) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((result) => tryFn(iteratee, result, item, index, collection));
        },
        Promise.resolve(result)
    );
};
