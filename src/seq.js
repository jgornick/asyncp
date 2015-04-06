import waterfall from './waterfall';

export default function seq(...tasks) {
    return (...args) => waterfall(tasks, ...args);
};