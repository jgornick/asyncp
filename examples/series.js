import * as mock from './mock';
import async from '../src/async';

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

async.series([a, b, c])
    .then((...args) => console.log('async.series done', args))
    .catch((error) => console.log('async.series error', error));