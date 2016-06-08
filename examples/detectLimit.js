import * as mock from './mock';
import async from '../src/async';

let exists = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

let notExists = mock.delayPredicate(
    'notExists',
    (item, timeout, resolve) => resolve(item == 'd.js')
);

async.detectLimit(mock.files, 2, exists)
    .then((...args) => console.log('async.detectLimit done', args))
    .catch((error) => console.log('async.detectLimit error', error));

async.detectLimit(mock.files, 2, notExists, 'foo')
    .then((...args) => console.log('async.detectLimit notExists done', args))
    .catch((error) => console.log('async.detectLimit notExists error', error));