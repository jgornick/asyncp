import when from 'when';
import * as mock from './mock';
import async from './async';

let readDir = mock.delayPredicate(
    'readDir',
    (item, timeout, resolve) => resolve([item, timeout])
);

async.concat(mock.dirs, readDir)
    .then((...args) => console.log('async.concat done', args))
    .catch((error) => console.log('async.concat error', error));