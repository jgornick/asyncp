import * as mock from './mock';
import * as async from './async';

async.map(mock.files, mock.mapSaveFile)
    .then((...args) => console.log('async.map done', args))
    .catch((error) => console.log('async.map error', error));