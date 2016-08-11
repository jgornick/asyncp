import throat from 'throat';
import tryFn from './tryFn';

export default function eachOfLimit(collection, limit, iteratee) {
    if (! limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }
        
    const keys = Object.keys(collection);
    const values = keys.map(key => collection[key]);
    return Promise.all(
        keys.map(throat(limit, (key, index) => {
            return tryFn(iteratee, values[index], key, collection)
        }))
    )
        .then((results) => results.reduce(
            (result, item, index) => {
                result[keys[index]] = item;
                return result;
            },
            {}
        ));
};
