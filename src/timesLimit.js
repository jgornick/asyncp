import throat from 'throat';
import tryFn from './tryFn';

export default function timesLimit(n, limit, iteratee, ...args) {
    return Promise.all(
        new Array(n)
            .fill()
            .map(throat(limit, (item, index) => tryFn(iteratee, index, ...args)))
    );
};
