import throat from 'throat';
import tryFn from './tryFn';

export default function parallelLimit(tasks, limit, ...args) {
    if (! limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(tasks.map(throat(limit, (task) => tryFn(task, ...args))));
};
