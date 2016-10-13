import tryFn from './tryFn';
import promised from './promised';

export default promised(function reduceRight(collection, result, iteratee) {
    return collection.reduceRight(
        (promise, item, index, collection) => {
            return promise.then((result) => tryFn(iteratee, result, item, index, collection));
        },
        Promise.resolve(result)
    );
});
