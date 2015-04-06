import tryFn from './tryFn';

export default function parallel(tasks, ...args) {
    return Promise.all(tasks.map((task) => tryFn(task, ...args)));
};