import * as mock from './mock';
import async from './async';

async.times(
    5,
    (index, prefix) => {
        return { id: prefix + '-' + index }
    },
    'user'
)
    .then((...args) => console.log('async.times done', args))
    .catch((error) => console.log('async.times error', error));

async.times(
    5,
    (index, prefix) => {
        let timeout = mock.getTimeout(1,3);
        console.log('callback timeout', timeout);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    resolve({ id: prefix + '-' + index });
                },
                timeout
            );
        });
    },
    'user'
)
    .then((...args) => console.log('async.times timeout done', args))
    .catch((error) => console.log('async.times timeout error', error));