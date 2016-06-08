import * as mock from './mock';
import async from '../src/async';

async.timeout(
    () => new Promise(resolve => setTimeout(resolve.bind(null, true), 2000)),
    1000
)
    .then((result) => console.log('timeout done', result))
    .catch((error) => console.log('timeout catch', error));

async.timeout(
    () => new Promise(resolve => setTimeout(resolve.bind(null, true), 2000)),
    4000
)
    .then((result) => console.log('timeout done', result))
    .catch((error) => console.log('timeout catch', error));