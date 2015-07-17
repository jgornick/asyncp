import * as mock from './mock';
import async from '../src/async';

async.forever(
    (...args) => {
        let timeout = mock.getTimeout(1, 1);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    resolve(+new Date);
                },
                timeout
            );
        });
    },
    +new Date
)
    .catch((error) => console.log('async.forever error', error));