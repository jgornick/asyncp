import tryFn from './tryFn';
import promised from './promised';

export default promised(function until(condition, task, ...args) {
    return tryFn(condition, ...args)
        .then((conditionResult) => {
            return conditionResult
                ? Promise.resolve()
                : tryFn(task, ...args).then((result) =>
                    Array.isArray(result)
                        ? until(condition, task, ...result)
                        : until(condition, task, result)
                );
        });
});
