import * as mock from './mock';
import * as async from './async';

async.timesSeries(
    5,
    (index, prefix) => {
        return { id: prefix + '-' + index }
    },
    'user'
)
    .then((...args) => console.log('async.timesSeries done', args))
    .catch((error) => console.log('async.timesSeries error', error));

async.timesSeries(
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
    .then((...args) => console.log('async.timesSeries timeout done', args))
    .catch((error) => console.log('async.timesSeries timeout error', error));