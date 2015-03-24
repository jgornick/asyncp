import * as mock from './mock';
import * as async from './async';

async.each(mock.files, mock.mapSaveFile)
    .then((...args) => console.log('async.each done', args))
    .catch((error) => console.log('async.each error', error));