import when from 'when';
import * as mock from './mock';
import * as async from './async';

let inc = mock.delayReducer(
    'inc',
    (result, item, timeout, resolve) => resolve(++result)
);

async.reduce(mock.files, 0, inc)
    .then((...args) => console.log('async.reduce done', args))
    .catch((error) => console.log('async.reduce error', error));

when.reduce(mock.files, inc, 0)
    .then((...args) => console.log('when.reduce done', args))
    .catch((error) => console.log('when.reduce error', error));