import * as mock from './mock';
import async from './async';

async.mapSeries(mock.files, mock.mapSaveFile)
    .then((...args) => console.log('async.mapSeries done', args))
    .catch((error) => console.log('async.mapSeries error', error));
