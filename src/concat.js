import tryFn from './tryFn';

export default function concat(collection, iteratee) {
    let
        results = [];

    return Promise.all(collection.map((item, index, collection) => {
        return tryFn(iteratee, item, index, collection)
            .then((result) => results.push(...result));
    }))
        .then(() => results);
};