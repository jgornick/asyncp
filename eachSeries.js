import when from 'when';

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
                return results;
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

when.reduce(openFiles, (results, file) => {
    return saveFile(file)
        .then((result) => {
                results.push(result);
                return results;
            });
}, [])
    .then((...args) => {
        console.log('when done', args);
    })
    .catch((error) => {
        console.log('when error', error);
    });