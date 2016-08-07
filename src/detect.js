import tryFn from './tryFn';
import PromiseBreak from './promiseBreak';

export default function detect(collection, predicate, notFound = undefined) {
    return Promise.all(collection.map((item, index, collection) => {
        return tryFn(predicate, item, index, collection)
            .then((result) => {
                if (result === true) {
                    return Promise.reject(new PromiseBreak(item));
                }
                return result;
            });
    }))
        .then(() => notFound)
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }
            throw error;
        });
};
