import when from 'when';
import * as mock from './mock';
import async from './async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.reject(mock.files, predicate)
    .then((...args) => console.log('async.reject done', args))
    .catch((error) => console.log('async.reject error', error));

when.filter(mock.files, (...args) => when(predicate(...args), (result) => !result))
    .then((...args) => console.log('when done', args))
    .catch((error) => console.log('when error', error));