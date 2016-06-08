import tryFn from './tryFn';

export default function applyEach(collection, ...args) {
    return Promise.all(collection.map((f) => tryFn(f, ...args)));
};