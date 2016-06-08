import * as mock from './mock';
import async from '../src/async';

function add1(n) {
    console.log('add1', n);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n + 1);
        }, 1000);
    });
}

function mul3(n) {
    console.log('mul3', n);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n * 3);
        }, 1000);
    });
}

async.applyEachSeries([mul3, add1], 5)
    .then((...args) => console.log('async.applyEach done', args))
    .catch((error) => console.log('async.applyEach error', error));