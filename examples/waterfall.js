import * as mock from './mock';
import async from '../src/async';

async.waterfall(
    [
        (context, timeout) => {
            console.log('context', context);
            console.log('timeout', timeout);
            return new Promise((resolve, reject) => {
                setTimeout(
                    () => {
                        context.a = true;
                        resolve([context, timeout]);
                    },
                    timeout
                );
            });
        },

        (context, timeout) => {
            console.log('context', context);
            console.log('timeout', timeout);
            return new Promise((resolve, reject) => {
                setTimeout(
                    () => {
                        context.b = true;
                        resolve([context, timeout]);
                    },
                    timeout
                );
            });
        },

        (context, timeout) => {
            console.log('context', context);
            console.log('timeout', timeout);
            return new Promise((resolve, reject) => {
                setTimeout(
                    () => {
                        context.c = true;
                        resolve([context, timeout]);
                    },
                    timeout
                );
            });
        },

        (context, timeout) => {
            context.d = true;
            return [context, timeout];
        }
    ],
    { a: false, b: false, c: false, d: false },
    mock.getTimeout(1, 1)
)
    .then((results) => console.log('async.waterfall done', results))
    .catch((error) => console.log('async.waterfall error', error));