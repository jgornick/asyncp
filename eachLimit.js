import when from 'when';
import guard from 'when/guard';

import * as mock from './mock';
import * as async from './async';

async.eachLimit(mock.files, 2, mock.mapSaveFile)
    .then((...args) => console.log('async.eachLimit done', args))
    .catch((error) => console.log('async.eachLimit error', error));

when.all(mock.files.map(guard(guard.n(2), mock.mapSaveFile)))
    .then((...args) => console.log('when done', args))
    .catch((error) => console.log('when error', error));