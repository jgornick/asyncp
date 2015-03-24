import when from 'when';
import * as mock from './mock';
import * as async from './async';

let exists = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.detect(mock.files, exists)
    .then((...args) => console.log('async.detect done', args))
    .catch((error) => console.log('async.detect error', error));