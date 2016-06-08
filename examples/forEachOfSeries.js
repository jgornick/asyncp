import * as mock from './mock';
import async from '../src/async';

async.forEachOfSeries(mock.object, mock.generateDelay('forEachOfSeries', (value, timeout, resolve) => resolve(value)))
    .then((...args) => console.log('async.forEachOfSeries done', args))
    .catch((error) => console.log('async.forEachOfSeries error', error));

async.forEachOfSeries(mock.object, (value, key, collection) => {
    collection[key] = value + '-foo';
    return value + '-foo';
})
    .then((...args) => console.log('async.forEachOfSeries done', args))
    .catch((error) => console.log('async.forEachOfSeries error', error));