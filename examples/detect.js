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

async.detect(mock.files, exists)
    .then((...args) => console.log('async.detect done', args))
    .catch((error) => console.log('async.detect error', error));

async.detect(mock.files, notExists, 'foo')
    .then((...args) => console.log('async.detect notExists done', args))
    .catch((error) => console.log('async.detect notExists error', error));