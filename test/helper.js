export function id(value) {
    return value;
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

export function accIterateeDelayWithOrder(order, resolver = id) {
    return (acc, value, key, collection) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    order.push(value);
                    try {
                        resolve(resolver(acc, value, key, collection));
                    } catch (e) {
                        reject(e);
                    }
                },
                value * 25
            );
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

export function accIterateePromiseWithOrder(order, resolver = id) {
    return (acc, value, key, collection) => {
        return new Promise(resolve => {
            order.push(value);
            try {
                resolve(resolver(acc, value, key, collection));
            } catch (e) {
                reject(e);
            }
        });
    };
};

export function iterateeNativeWithOrder(order, resolver = id) {
    return (value, key, collection) => {
        order.push(value);
        return resolver(value, key, collection);
    };
};

export function accIterateeNativeWithOrder(order, resolver = id) {
    return (acc, value, key, collection) => {
        order.push(value);
        return resolver(acc, value, key, collection);
    };
};

export function delayedTask(index, resolver = id) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    try {
                        resolve(resolver(...args, index));
                    } catch (e) {
                        reject(e);
                    }
                },
                index * 25
            );
        });
    };
};

export function delayedWithOrder(order, index, resolver = id) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    order.push(index);
                    try {
                        resolve(resolver(...args, index));
                    } catch (e) {
                        reject(e);
                    }
                },
                index * 25
            );
        });
    };
};

export function promiseTask(index, resolver = id) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(resolver(...args, index));
            } catch (e) {
                reject(e);
            }
        });
    };
};

export function promiseWithOrder(order, index, resolver = id) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            order.push(index);
            try {
                resolve(resolver(...args, index));
            } catch (e) {
                reject(e);
            }
        });
    };
};

export function nativeTask(index, resolver = id) {
    return (...args) => {
        return resolver(...args, index);
    };
};

export function nativeWithOrder(order, index, resolver = id) {
    return (...args) => {
        order.push(index);
        return resolver(...args, index);
    };
};
