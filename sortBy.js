import when from 'when';
import * as mock from './mock';
import async from './async';

let stat = mock.delayPredicate(
    'stat',
    (item, timeout, resolve) => resolve(+new Date)
);

async.sortBy(mock.files, stat)
    .then((...args) => console.log('async.sortBy done', args))
    .catch((error) => console.log('async.sortBy error', error));

async.sortBy(mock.files, stat, (a, b) => a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0)
    .then((...args) => console.log('async.sortBy desc done', args))
    .catch((error) => console.log('async.sortBy desc error', error));