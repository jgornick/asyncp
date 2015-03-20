import when from 'when';
import whenSequence from 'when/sequence';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    saveFile = (file) => {
        console.log('saveFile', file);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log('timeout', file);
                    resolve(file);
                },
                2000
            );
        });
    };

let results = [];

openFiles.reduce(
    (promise, file) => {
        return promise
            .then(saveFile.bind(null, file))
            .then((result) => {
                results.push(result);
                return Promise.resolve(results);
            });
    },
    Promise.resolve()
)
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });

whenSequence(openFiles.map((file) => {
    return saveFile.bind(null, file);
}))
    .then((...args) => {
        console.log('when done', args);
    })
    .catch((error) => {
        console.log('when error', error);
    });