import tryFn from './tryFn';

export default function whilst(condition, task, ...args) {
    return tryFn(condition)
        .then((conditionResult) => {
            return conditionResult
                ? tryFn(task, ...args).then(() => whilst(condition, task, ...args))
                : Promise.resolve();
        });
};