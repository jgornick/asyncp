import * as mock from './mock';
import async from '../src/async';

let exists = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(true)
);

let existsFalse = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item != 'b.js')
);

// async.everyLimit(mock.files, 2, exists)
//     .then((...args) => console.log('async.every true done', args))
//     .catch((error) => console.log('async.every true error', error));

async.everyLimit(mock.files, 2, existsFalse)
    .then((...args) => console.log('async.every false done', args))
    .catch((error) => console.log('async.every false error', error));