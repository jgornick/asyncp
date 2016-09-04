import tryFn from './tryFn';

export default function forever(task, ...args) {
    return tryFn(task, ...args).then((result) =>
        Array.isArray(result)
            ? forever(task, ...result)
            : forever(task, result)
    );
};
