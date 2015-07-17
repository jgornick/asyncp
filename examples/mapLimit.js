import * as mock from './mock';
import async from '../src/async';

async.mapLimit(mock.files, 2, mock.mapSaveFile)
    .then((...args) => console.log('async.mapLimit done', args))
    .catch((error) => console.log('async.mapLimit error', error));