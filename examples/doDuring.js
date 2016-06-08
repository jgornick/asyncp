import * as mock from './mock';
import async from '../src/async';

let count = 0;

async.doDuring(
    () => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('doDuring task', count, timeout);
            setTimeout(() => resolve(count++), timeout);
        });
    },
    () => Promise.resolve(count < 5)
)
    .then((...args) => console.log('async.doDuring done', args))
    .catch((error) => console.log('async.doDuring error', error));