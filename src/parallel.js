import tryFn from './tryFn';
import promised from './promised';

export default promised(function parallel(tasks, ...args) {
    return Promise.all(tasks.map((task) => tryFn(task, ...args)));
});
