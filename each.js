import when from 'when';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    saveFile = (file) => {
        console.log('saveFile', file);
        return when.promise((resolve, reject) => {
            setTimeout(
                () => {
                    console.log('timeout', file);
                    resolve(file);
                },
                2000
            );
        });
    };

Promise.all(openFiles.map((file) => {
    return saveFile(file);
}))
    .then(() => {
        console.log('promise done');
    })
    .catch((error) => {
        console.log('promise error', error);
    });

when.all(openFiles.map((file) => {
    return saveFile(file);
}))
    .then(() => {
        console.log('when done');
    })
    .catch((error) => {
        console.log('when error', error);
    });