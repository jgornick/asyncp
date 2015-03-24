export function getTimeout(min, max) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) + min)
};

export var dirs = ['/a', '/b', '/c'];
export var files = ['a.js', 'b.js', 'c.js'];

export function generateDelay(name, onTimeout) {
    return (item) => {
        return new Promise((resolve, reject) => {
            let timeout = getTimeout(1, 5);
            console.log(name, item, timeout);
            setTimeout(() => onTimeout(item, timeout, resolve, reject), timeout);
        });
    };
};

export function delayPredicate(name, callback) {
    return generateDelay(
        name,
        (item, timeout, resolve, reject) => {
            return callback(item, timeout, resolve, reject);
        }
    );
};

export function delayReducer(name, callback) {
    return (result, item) => {
        return new Promise((resolve, reject) => {
            let timeout = getTimeout(1, 5);
            console.log(name, item, timeout);
            setTimeout(() => callback(result, item, timeout, resolve, reject), timeout);
        });
    };
};

export var mapSaveFile = generateDelay(
    'mapSaveFile',
    (file, timeout, resolve, reject) => {
        console.log('mapSaveFile timeout', file, timeout);
        resolve(file);
    }
);

export function detectSaveFile(predicate) {
    return generateDelay(
        'detectSaveFile',
        (file, timeout, resolve, reject) => {
            console.log('detectSaveFile timeout', file, timeout);
            resolve(predicate(file, timeout));
        }
    );
};

export function exists(file) {
    console.log('exits', file);
    return new Promise((resolve, reject) => {
        let timeout = getTimeout(1, 5);
        setTimeout(
            () => {
                console.log('timeout', file, timeout);
                resolve(file == 'b.js');
            },
            timeout
        );
    });
};

export function readDir(dir) {
    console.log('readDir', dir);
    return new Promise((resolve, reject) => {
        let timeout = getTimeout(1, 5);
        setTimeout(
            () => {
                console.log('timeout', file, timeout);
                resolve([file, timeout]);
            },
            timeout
        );
    });
};