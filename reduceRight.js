import when from 'when';
import guard from 'when/guard';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    inc = (result, item) => {
        console.log('inc', result, item);
        return when.promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log('timeout', result, item);
                    result++;
                    resolve(result);
                },
                2000
            );
        });
    };

openFiles.reduceRight(
    (promise, file) => promise.then((result) => inc(result, file)),
    Promise.resolve(0)
)
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });

when.reduceRight(openFiles, inc, 0)
    .then((...args) => {
        console.log('when done', args);
    })
    .catch((error) => {
        console.log('when error', error);
    });