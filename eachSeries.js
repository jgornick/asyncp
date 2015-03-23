import when from 'when';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    saveFile = (file) => {
        console.log('saveFile', file);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log('timeout', file);
                    resolve(file == 'b.js' ? false : file);
                },
                2000
            );
        });
    };

function eachSeries(collection, iterator) {
    const
        BREAK = '__break__';

    let
        results = [];

    return collection.reduce(
        (promise, item) => promise.then((results) => {
            return iterator(item)
                .then((result) => {
                    if (result === false) {
                        return Promise.reject(BREAK);
                    }

                    results.push(result);
                    return results;
                });
        }),
        Promise.resolve(results)
    )
        .catch((error) => {
            if (error == BREAK) {
                return Promise.resolve(results);
            }

            return Promise.reject(error);
        });
};

eachSeries(openFiles, saveFile)
    .then((...args) => {
        console.log('eachSeries done', args);
    })
    .catch((error) => {
        console.log('eachSeries error', error);
    });

openFiles.reduce(
    (promise, file) => promise.then((results) => {
        return saveFile(file)
            .then((result) => {
                results.push(result);
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