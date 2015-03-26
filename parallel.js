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

async.parallel([a, b, c])
    .then((...args) => console.log('async.parallel done', args))
    .catch((error) => console.log('async.parallel error', error));