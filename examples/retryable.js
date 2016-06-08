import * as mock from './mock';
import async from '../src/async';

let
    count = 0,
    countTimeout = 0;

const r = async.retryable(
    { times: 3, interval: 2000 },
    () => {
        console.log('task', count);
        if (++count == 3) {
            return true
        } else {
            throw new Error(`Request failed ${count}`);
        }
    }
);

r()
    .then((...args) => console.log('async.retryable done', args))
    .catch((error) => console.log('async.retryable error', error));
