import * as mock from './mock';
import async from '../src/async';

async.during(
    (count) => {
        console.log('condition count', count);
        return Promise.resolve(count >= 0 && count < 5);
    },
    (count) => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('during task', count, timeout);
            setTimeout(() => resolve(++count), timeout);
        });
    },
    0
)
    .then((...args) => console.log('async.during done', args))
    .catch((error) => console.log('async.during error', error));