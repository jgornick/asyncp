export default function tryFn(fn, ...args) {
    try {
        return Promise.resolve(fn(...args));
    } catch (error) {
        return Promise.reject(error);
    }
};