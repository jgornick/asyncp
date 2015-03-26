import * as mock from './mock';
import * as async from './async';

let a = mock.delayPredicate(
    'a',
    (item, timeout, resolve) => resolve('a.js')
);
let b = mock.delayPredicate(
    'b',
    (item, timeout, resolve) => resolve('b.js')
);
let c = mock.delayPredicate(
    'c',
    (item, timeout, resolve) => resolve('c.js')
);

async.parallelLimit([a, b, c], 2)
    .then((...args) => console.log('async.parallelLimit done', args))
    .catch((error) => console.log('async.parallelLimit error', error));