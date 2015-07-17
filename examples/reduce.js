import * as mock from './mock';
import async from '../src/async';

let inc = mock.delayReducer(
    'inc',
    (result, item, timeout, resolve) => resolve(++result)
);

async.reduce(mock.files, 0, inc)
    .then((...args) => console.log('async.reduce done', args))
    .catch((error) => console.log('async.reduce error', error));