import when from 'when';

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

Promise.all(openFiles.map(exists))
    .then((results) => {
        return openFiles
            .map((file, index) => results[index] ? file : '__remove__')
            .filter((file) => file != '__remove__');
    })
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });

when.filter(openFiles, exists)
    .then((...args) => {
        console.log('when done', args);
    })
    .catch((error) => {
        console.log('when error', error);
    });