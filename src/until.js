import tryFn from './tryFn';

export default function until(condition, task, ...args) {
    return tryFn(condition)
        .then((conditionResult) => {
            return conditionResult
                ? Promise.resolve()
                : tryFn(task, ...args).then(() => until(condition, task, ...args));
        });
};