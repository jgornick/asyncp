import tryFn from './tryFn';
import whilst from './whilst';

export default function doWhilst(task, condition, ...args) {
    return tryFn(task, ...args).then(() => whilst(condition, task, ...args));
};