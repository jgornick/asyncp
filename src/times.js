import tryFn from './tryFn';

export default function times(n, callback, ...args) {
    return Promise.all(new Array(n).fill(null).map((item, index) => tryFn(callback, index, ...args)));
};