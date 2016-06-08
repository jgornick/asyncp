import * as mock from './mock';
import async from '../src/async';

async.forEachOf(mock.object, mock.generateDelay('forEachOf', (value, timeout, resolve) => resolve()))
    .then((...args) => console.log('async.forEachOf done', args))
    .catch((error) => console.log('async.forEachOf error', error));

async.forEachOf(mock.object, (value, key, collection) => {
    collection[key] = value + '-foo';
})
    .then((...args) => console.log('async.forEachOf done', args))
    .catch((error) => console.log('async.forEachOf error', error));