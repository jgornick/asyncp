export default function promised(fn) {
    return function(...args) {
        return Promise.all(args)
            .then(args => fn.call(this, ...args));
    }
};
