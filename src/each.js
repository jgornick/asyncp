import tryFn from './tryFn';

export default function each(collection, iteratee) {
    return Promise.all(collection.map((...args) => tryFn(iteratee, ...args)));
};
