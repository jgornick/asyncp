import * as mock from './mock';
import * as async from './async';

let exists = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.detectSeries(mock.files, exists)
    .then((...args) => console.log('async.detectSeries done', args))
    .catch((error) => console.log('async.detectSeries error', error));