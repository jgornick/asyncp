import * as mock from './mock';
import async from '../src/async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.filter(mock.files, predicate)
    .then((...args) => console.log('async.filter done', args))
    .catch((error) => console.log('async.filter error', error));