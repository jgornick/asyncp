export default function mapSeries(collection, iterator) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((results) => {
                return Promise.resolve(iterator(item, index, collection))
                    .then((result) => {
                        results.push(result);
                        return results;
                    });
            });
        },
        Promise.resolve([])
    );
};