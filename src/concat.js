import tryFn from './tryFn';

export default function concat(collection, iterator) {
    let
        results = [];

    return Promise.all(collection.map((item, index, collection) => {
        return tryFn(iterator, item, index, collection)
            .then((result) => results.push(...result));
    }))
        .then(() => results);
};