import * as mock from './mock';
import * as async from './async';

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
        }, 2000);
    });
}

let mul3add1 = async.seq(mul3, add1);

mul3add1(4)
    .then((result) => console.log('async.seq done', result))
    .catch((error) => console.log('async.seq error', error));