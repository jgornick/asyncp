import throat from 'throat';
import tryFn from './tryFn';

export default function forEachOfLimit(collection, limit, iteratee) {
    return Promise.all(
        Object.keys(collection)
            .map(throat(limit, (key) => tryFn(iteratee, collection[key], key, collection)))
    )
        .then(() => collection);
};