import tryFn from './tryFn';

export default function eachOf(collection, iteratee) {
    return Promise.all(
        Object.keys(collection)
            .map((key) => tryFn(iteratee, collection[key], key, collection))
    )
        .then(() => collection);
};
