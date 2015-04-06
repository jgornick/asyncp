import throat from 'throat';
import tryFn from './tryFn';

export default function parallelLimit(tasks, limit, ...args) {
    return Promise.all(tasks.map(throat(limit, (task) => tryFn(task, ...args))));
};