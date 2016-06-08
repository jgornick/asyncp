import delay from './delay';

export default function timeout(promise, time, ...args) {
    if (typeof promise == 'function') {
        promise = promise(...args);
    }

    return Promise.race([
        promise,
        delay(time)
    ]);
};