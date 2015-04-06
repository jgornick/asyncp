export default function reduceRight(collection, result, iterator) {
    return collection.reduceRight(
        (promise, item, index, collection) => {
            return promise.then((result) => iterator(result, item, index, collection));
        },
        Promise.resolve(result)
    );
};