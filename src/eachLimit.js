import throat from 'throat';

export default function eachLimit(collection, limit, iteratee) {
    return Promise.all(collection.map(throat(limit, iteratee)));
};