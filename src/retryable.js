import retry from './retry';

export default function retryable({ times = 5, interval = 0 }, task, ...args) {
    return retry.bind(null, { times, interval }, task, ...args);
};