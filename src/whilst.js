import tryFn from './tryFn';

export default function whilst(condition, task, accumulator) {
    return tryFn(condition, accumulator)
        .then((conditionResult) => {
            return conditionResult
                ? tryFn(task, accumulator).then((result) => whilst(condition, task, result))
                : Promise.resolve(accumulator);
        });
};