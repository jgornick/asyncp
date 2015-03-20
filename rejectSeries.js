import when from 'when';
import guard from 'when/guard';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    exists = (file) => {
        console.log('exits', file);
        return when.promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log('timeout', file);
                    resolve(file == 'b.js');
                },
                2000
            );
        });
    };

openFiles.reduce(
    (promise, file) => promise.then((results) => {
        return exists(file)
            .then((result) => {
                if (!result) {
                    results.push(file);
                }
                return results;
            });
    }),
    Promise.resolve([])
)
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });

when.reduce(openFiles, (results, file) => {
    return exists(file)
        .then((result) => {
                if (!result) {
                    results.push(file);
                }

                return results;
            });
}, [])
    .then((...args) => {
        console.log('when done', args);
    })
    .catch((error) => {
        console.log('when error', error);
    });