import throat from 'throat';
import tryFn from './tryFn';
import promised from './promised';

const ASYNCP_UNDEFINED = '__ASYNCP_UNDEFINED__';

export default promised(function rejectLimit(collection, limit, predicate) {
    if (! limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map(throat(limit, (item, index, collection) =>
        tryFn(predicate, item, index, collection)
            .then(result => result === true ? ASYNCP_UNDEFINED : item)
    )))
        .then(results => results.filter(item => item != ASYNCP_UNDEFINED));
});
