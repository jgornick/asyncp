import tryFn from './tryFn';

export default function whilst(condition, task, ...args) {
    return tryFn(condition, ...args)
        .then((conditionResult) => {
            return conditionResult
                ? tryFn(task, ...args)
                    .then((result) =>
                        Array.isArray(result)
                            ? whilst(condition, task, ...result)
                            : whilst(condition, task, result)
                    )
                : Promise.resolve();
        });
};
