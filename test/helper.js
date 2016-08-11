export function id(value) {
    return value;
};

export function iterateeDelay(resolver = id) {
    return (value, key, collection) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    try {
                        resolve(resolver(value, key, collection));
                    } catch (e) {
                        reject(e);
                    }
                },
                value * 25
            );
        });
    };
};

export function iterateeDelayWithOrder(order, resolver = id) {
    return (value, key, collection) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    order.push(value);
                    try {
                        resolve(resolver(value, key, collection));
                    } catch (e) {
                        reject(e);
                    }
                },
                value * 25
            );
        });
    };
};

export function iterateePromise(resolver = id) {
    return (value, key, collection) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(resolver(value, key, collection));
            } catch (e) {
                reject(e);
            }
        });
    };
};

export function iterateePromiseWithOrder(order, resolver = id) {
    return (value, key, collection) => {
        return new Promise(resolve => {
            order.push(value);
            try {
                resolve(resolver(value, key, collection));
            } catch (e) {
                reject(e);
            }
        });
    };
};

export function iterateeNative(resolver = id) {
    return (value, key, collection) => {
        return resolver(value, key, collection);
    };
};

export function iterateeNativeWithOrder(order, resolver = id) {
    return (value, key, collection) => {
        order.push(value);
        return resolver(value, key, collection);
    };
};
