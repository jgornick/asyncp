import tryFn from './tryFn';
import promised from './promised';

export default promised(function forever(task, ...args) {
    return tryFn(task, ...args).then((result) =>
        Array.isArray(result)
            ? forever(task, ...result)
            : forever(task, result)
    );
});
