import * as mock from './mock';
import * as async from './async';

let count = 0;

async.doWhilst(
    () => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('doWhilst task', count, timeout);
            setTimeout(() => resolve(count++), timeout);
        });
    },
    () => Promise.resolve(count < 5)
)
    .then((...args) => console.log('async.doWhilst done', args))
    .catch((error) => console.log('async.doWhilst error', error));