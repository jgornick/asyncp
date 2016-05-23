import tryFn from './tryFn';

export default function sortBy(collection, iteratee, sorter) {
    if (sorter == null) {
        sorter = (a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    }

    return Promise.all(collection.map((item, index, collection) => {
        return tryFn(iteratee, item, index, collection)
            .then((result) => [result, item]);
    }))
        .then((collection) => collection.sort(sorter).map((item) => item[1]));
};