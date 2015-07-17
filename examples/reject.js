import * as mock from './mock';
import async from '../src/async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.reject(mock.files, predicate)
    .then((...args) => console.log('async.reject done', args))
    .catch((error) => console.log('async.reject error', error));