import * as mock from './mock';
import async from './async';

let count = 0;

async.until(
    () => Promise.resolve(count == 5),
    () => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('until task', count, timeout);
            setTimeout(() => resolve(count++), timeout);
        });
    }
)
    .then((...args) => console.log('async.until done', args))
    .catch((error) => console.log('async.until error', error));