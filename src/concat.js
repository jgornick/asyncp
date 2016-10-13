import tryFn from './tryFn';
import promised from './promised';

export default promised(function concat(collection, iteratee) {
    return Promise.all(collection.map((...args) => tryFn(iteratee, ...args)))
        .then((results) => results.reduce((result, item) => result.concat(item), []));
});
