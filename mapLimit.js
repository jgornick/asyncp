import when from 'when';
import guard from 'when/guard';

import * as mock from './mock';
import async from './async';

async.mapLimit(mock.files, 2, mock.mapSaveFile)
    .then((...args) => console.log('async.mapLimit done', args))
    .catch((error) => console.log('async.mapLimit error', error));

when.all(mock.files.map(guard(guard.n(2), mock.mapSaveFile)))
    .then((...args) => console.log('when done', args))
    .catch((error) => console.log('when error', error));