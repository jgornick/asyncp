import tryFn from './tryFn';
import promised from './promised';

export default promised(function each(collection, iteratee) {
    return Promise.all(collection.map((...args) => tryFn(iteratee, ...args)));
});
