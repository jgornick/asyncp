import * as mock from './mock';
import async from '../src/async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.rejectLimit(mock.files, 2, predicate)
    .then((...args) => console.log('async.rejectLimit done', args))
    .catch((error) => console.log('async.rejectLimit error', error));