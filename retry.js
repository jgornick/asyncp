import * as mock from './mock';
import async from './async';

let
    count = 0,
    countTimeout = 0;

async.retry(
    3,
    () => {
        console.log('task', count);
        if (++count == 3) {
            return true
        } else {
            throw new Error(`Request failed ${count}`);
        }
    }
)
    .then((...args) => console.log('async.retry done', args))
    .catch((error) => console.log('async.retry error', error));

async.retry(
    3,
    () => {
        let timeout = mock.getTimeout(1,1);
        console.log('task', countTimeout);
        console.log('task timeout', timeout);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (++countTimeout == 3) {
                        resolve(true);
                    } else {
                        reject(new Error(`Request failed ${countTimeout}`));
                    }
                },
                timeout
            );
        });
    }
)
    .then((...args) => console.log('async.retry timeout done', args))
    .catch((error) => console.log('async.retry timeout error', error));