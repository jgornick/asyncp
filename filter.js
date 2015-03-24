import when from 'when';
import * as mock from './mock';
import * as async from './async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.filter(mock.files, predicate)
    .then((...args) => console.log('async.filter done', args))
    .catch((error) => console.log('async.filter error', error));

when.filter(mock.files, predicate)
    .then((...args) => console.log('when done', args))
    .catch((error) => console.log('when error', error));