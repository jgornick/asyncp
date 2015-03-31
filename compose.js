import * as mock from './mock';
import * as async from './async';

function add1(n) {
    console.log('add1', n);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n + 1);
        }, 10);
    });
}

function mul3(n) {
    console.log('mul3', n);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n * 3);
        }, 10);
    });
}

let add1mul3 = async.compose(mul3, add1);

add1mul3(4)
    .then((result) => console.log('async.compose done', result))
    .catch((error) => console.log('async.compose error', error));