import tryFn from './tryFn';

export default function reduceRight(collection, result, iteratee) {
    return collection.reduceRight(
        (promise, item, index, collection) => {
            return promise.then((result) => tryFn(iteratee, result, item, index, collection));
        },
        Promise.resolve(result)
    );
};
