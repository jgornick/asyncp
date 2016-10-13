import tryFn from './tryFn';
import promised from './promised';
import until from './until';

export default promised(function doUntil(task, condition, ...args) {
    return tryFn(task, ...args)
        .then((result) =>
            Array.isArray(result)
                ? until(condition, task, ...result)
                : until(condition, task, result)
        );
});
