import tryFn from './tryFn';
import until from './until';

export default function doUntil(task, condition, ...args) {
    return tryFn(task, ...args).then(() => until(condition, task));
};