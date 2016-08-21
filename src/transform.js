import tryFn from './tryFn';

export default function transform(collection, accumulator, iteratee) {
    if (arguments.length === 2) {
        iteratee = accumulator;
        accumulator = Array.isArray(collection) ? [] : {}
    }

    return collection.reduce(
        (promise, ...args) => promise.then(_ => tryFn(iteratee, accumulator, ...args)),
        Promise.resolve()
    )
        .then(_ => accumulator);
};
