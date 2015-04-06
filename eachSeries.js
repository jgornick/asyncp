import * as mock from './mock';
import async from './async';

async.eachSeries(mock.files, mock.mapSaveFile)
    .then((...args) => console.log('async.eachSeries done', args))
    .catch((error) => console.log('async.eachSeries error', error));
