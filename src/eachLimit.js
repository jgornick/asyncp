import throat from 'throat';
import promised from './promised';

export default promised(function eachLimit(collection, limit, iteratee) {
    if (! limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map(throat(limit, iteratee)));
});
