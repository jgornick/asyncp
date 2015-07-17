import * as mock from './mock';
import async from '../src/async';

let exists = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.some(mock.files, exists)
    .then((...args) => console.log('async.some done', args))
    .catch((error) => console.log('async.some error', error));