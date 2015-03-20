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

openFiles.reduce(
    (promise, file) => {
        console.log('reduce', file, promise);
        return promise.then(saveFile.bind(null, file));
    },
    Promise.resolve()
)
    .then(() => {
        console.log('done');
    })
    .catch((error) => {
        console.log('error');
    });

openFiles.reduce(
    (promise, file) => {
        console.log('reduce', file, promise);
        return promise.then(saveFile.bind(null, file));
    },
    when.resolve()
)
    .then(() => {
        console.log('done');
    })
    .catch((error) => {
        console.log('error');
    });