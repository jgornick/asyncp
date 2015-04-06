import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function every(collection, predicate) {
    return Promise.all(collection.map((item, index, collection) => {
        return tryFn(predicate, item, index, collection)
            .then((result) => {
                if (result === false) {
                    return Promise.reject(new PromiseBreak(false));
                }
                return result;
            });
    }))
        .then(() => true)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};