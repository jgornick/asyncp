import waterfall from './waterfall';

export default function compose(...tasks) {
    return (...args) => waterfall(tasks.reverse(), ...args);
};