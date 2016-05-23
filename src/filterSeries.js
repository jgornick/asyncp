export default function filterSeries(collection, predicate) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((results) => {
                return Promise.resolve(predicate(item, index, collection))
                    .then((result) => {
                        if (result === true) {
                            results.push(item);
                        }
                        return results;
                    });
            });
        },
        Promise.resolve([])
    );
};