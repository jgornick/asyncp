import * as mock from './mock';
import async from '../src/async';

async.eachLimit(mock.files, 2, mock.mapSaveFile)
    .then((...args) => console.log('async.eachLimit done', args))
    .catch((error) => console.log('async.eachLimit error', error));