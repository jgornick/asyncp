import * as mock from './mock';
import async from '../src/async';

let count = 0;
async.doWhilst(
    () => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('doWhilst task', count, timeout);
            setTimeout(() => resolve(++count), timeout);
        });
    },
    () => {
        console.log('doWhilst condition', count);
        return Promise.resolve(count < 5)
    }
)
    .then((...args) => console.log('async.doWhilst done', args, count))
    .catch((error) => console.log('async.doWhilst error', error));

async.doWhilst(
    (count) => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('doWhilst task', count, timeout);
            setTimeout(() => resolve(++count), timeout);
        });
    },
    (count) => {
        console.log('doWhilst condition', count);
        return Promise.resolve(count < 5)
    },
    0
)
    .then((...args) => console.log('async.doWhilst done', args))
    .catch((error) => console.log('async.doWhilst error', error));