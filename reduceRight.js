import when from 'when';
import * as mock from './mock';
import async from './async';

let inc = mock.delayReducer(
    'inc',
    (result, item, timeout, resolve) => resolve(++result)
);

async.reduceRight(mock.files, 0, inc)
    .then((...args) => console.log('async.reduceRight done', args))
    .catch((error) => console.log('async.reduceRight error', error));

when.reduceRight(mock.files, inc, 0)
    .then((...args) => console.log('when.reduceRight done', args))
    .catch((error) => console.log('when.reduceRight error', error));