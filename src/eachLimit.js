import throat from 'throat';

export default function eachLimit(collection, limit, iterator) {
    return Promise.all(collection.map(throat(limit, iterator)));
};