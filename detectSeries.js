import * as mock from './mock';
import * as async from './async';

let exists = mock.delayPredicate(
    'exists',
    (item, timeout, resolve) => resolve(item == 'b.js')
);

let notExists = mock.delayPredicate(
    'notExists',
    (item, timeout, resolve) => resolve(item == 'd.js')
);

async.detectSeries(mock.files, exists)
    .then((...args) => console.log('async.detectSeries done', args))
    .catch((error) => console.log('async.detectSeries error', error));

async.detectSeries(mock.files, notExists)
    .then((...args) => console.log('async.detectSeries notExists done', args))
    .catch((error) => console.log('async.detectSeries notExists error', error));