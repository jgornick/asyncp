import tryFn from './tryFn';

export default function forever(task, ...args) {
    return tryFn(task, ...args).then((...results) => forever(task, ...results));
};