import throat from 'throat';

export default function eachLimit(collection, limit, iteratee) {
    if (! limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map(throat(limit, iteratee)));
};
