import when from 'when';
import PromiseBreak from './promise-break.js';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    exists = (file) => {
        console.log('exits', file);
        return when.promise((resolve, reject) => {
            let timeout = Math.floor(Math.random() * (5000 - 1000) + 1000);
            setTimeout(
                () => {
                    console.log('timeout', file, timeout);
                    // reject(new Error('should catch'));
                    resolve(file == 'b.js');
                },
                timeout
            );
        });
    };

function detectSeries(collection, predicate) {
    return collection.reduce(
        (promise, item) => promise.then((results) => {
            return predicate(item)
                .then((result) => {
                    if (result === true) {
                        return Promise.reject(new PromiseBreak(item));
                    }
                    return results;
                });
        }),
        Promise.resolve(null)
    )
        .then((results) => Promise.resolve(null))
        .catch((error) => {
            if (error instanceof PromiseBreak) {
                return Promise.resolve(error.value);
            }

            return Promise.reject(error);
        });
}

detectSeries(openFiles, exists)
    .then((...args) => {
        console.log('detect done', args);
    })
    .catch((error) => {
        console.log('detect error', error);
    });