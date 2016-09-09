import tryFn from './tryFn';

export default function times(n, iteratee, ...args) {
    return Promise.all(
        new Array(n)
            .fill()
            .map((item, index) => tryFn(iteratee, index, ...args))
    );
};
