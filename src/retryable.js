import retry from './retry';

export default function retryable(...args) {
    return retry.bind(null, ...args);
};
