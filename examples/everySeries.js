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

async.everySeries(mock.files, exists)
    .then((...args) => console.log('async.everySeries true done', args))
    .catch((error) => console.log('async.everySeries true error', error));

async.everySeries(mock.files, existsFalse)
    .then((...args) => console.log('async.everySeries false done', args))
    .catch((error) => console.log('async.everySeries false error', error));