import tryFn from './tryFn';

export default function liftFn(fn) {
    return (...args) => {
        return tryFn(fn, ...args);
    };
};