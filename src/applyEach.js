import tryFn from './tryFn';

export default function applyEach(collection, ...args) {
    if (!args.length) {
        return applyEach.bind(this, collection);
    } else {
        return Promise.all(collection.map((f) => tryFn(f, ...args)));
    }
};
