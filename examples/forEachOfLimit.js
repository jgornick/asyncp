import * as mock from './mock';
import async from '../src/async';

async.forEachOfLimit(mock.object, 2, mock.generateDelay('forEachOfLimit', (value, timeout, resolve) => resolve()))
    .then((...args) => console.log('async.forEachOfLimit done', args))
    .catch((error) => console.log('async.forEachOfLimit error', error));

async.forEachOfLimit(mock.object, 2, (value, key, collection) => {
    collection[key] = value + '-foo';
})
    .then((...args) => console.log('async.forEachOfLimit done', args))
    .catch((error) => console.log('async.forEachOfLimit error', error));