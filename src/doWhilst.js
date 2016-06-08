import tryFn from './tryFn';
import whilst from './whilst';

export default function doWhilst(task, condition, accumulator) {
    return tryFn(task, accumulator).then((result) => whilst(condition, task, result));
};