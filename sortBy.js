import when from 'when';

let
    openFiles = ['a.js', 'b.js', 'c.js'],
    stat = (file) => {
        console.log('stat', file);
        return when.promise((resolve, reject) => {
            let timeout = Math.floor(Math.random() * (5000 - 1000) + 1000);
            setTimeout(
                () => {
                    console.log('timeout', file, timeout);
                    resolve(+new Date);
                },
                timeout
            );
        });
    };

function sortBy(collection, iterator, sorter) {
    if (sorter == null) {
        sorter = (a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    }

    return Promise
        .all(collection.map((item) => iterator(item).then((result) => [result, item])))
        .then((collection) => collection.sort(sorter).map((item) => item[1]));
}

sortBy(openFiles, stat)
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });

sortBy(openFiles, stat, (a, b) => a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0)
    .then((...args) => {
        console.log('promise done', args);
    })
    .catch((error) => {
        console.log('promise error', error);
    });
