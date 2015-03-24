import * as mock from './mock';
import * as async from './async';

let predicate = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

async.filterSeries(mock.files, predicate)
    .then((...args) => console.log('async.filterSeries done', args))
    .catch((error) => console.log('async.filterSeries error', error));