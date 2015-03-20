import when from 'when';
import guard from 'when/guard';
import throat from 'throat';

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

Promise.all(openFiles.map(throat(2, saveFile)))
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });

when.all(openFiles.map(guard(guard.n(2), saveFile)))
    .then((...args) => {
        console.log('when done', args);
    })
    .catch((error) => {
        console.log('when error', error);
    });