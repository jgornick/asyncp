import * as mock from './mock';
import async from './async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.rejectSeries(mock.files, predicate)
    .then((...args) => console.log('async.rejectSeries done', args))
    .catch((error) => console.log('async.rejectSeries error', error));