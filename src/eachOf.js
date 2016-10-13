import tryFn from './tryFn';
import promised from './promised';

export default promised(function eachOf(collection, iteratee) {
    const keys = Object.keys(collection);
    return Promise.all(
        keys.map((key) => tryFn(iteratee, collection[key], key, collection))
    )
        .then((results) => results.reduce(
            (result, item, index) => {
                result[keys[index]] = item;
                return result;
            },
            {}
        ));
});
