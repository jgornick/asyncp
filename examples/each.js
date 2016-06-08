import * as mock from './mock';
import async from '../src/async';

async.each(mock.files, mock.generateDelay('each', (value, timeout, resolve) => resolve()))
    .then((...args) => console.log('async.each done', args))
    .catch((error) => console.log('async.each error', error));