import tryFn from './tryFn';
import promised from './promised';
import whilst from './whilst';

export default promised(function doWhilst(task, condition, ...args) {
    return tryFn(task, ...args)
        .then((result) =>
            Array.isArray(result)
                ? whilst(condition, task, ...result)
                : whilst(condition, task, result)
        );
});
