import delay from './delay';
import tryFn from './tryFn';

export default function timeout(promise, time, ...args) {
    if (typeof promise == 'function') {
        promise = tryFn(promise, ...args);
    }

    return Promise.race([
        promise,
        delay(time)
    ]);
};
