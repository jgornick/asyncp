import throat from 'throat';
import tryFn from './tryFn';
import promised from './promised';
import PromiseBreak from './promiseBreak';

export default promised(function everyLimit(collection, limit, predicate) {
    if (! limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map(throat(limit, (item, index, collection) => {
        return tryFn(predicate, item, index, collection)
            .then((result) => {
                if (result === false) {
                    return Promise.reject(new PromiseBreak(false));
                }
                return result;
            });
    })))
        .then(() => true)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
});
