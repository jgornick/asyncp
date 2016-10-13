import throat from 'throat';
import tryFn from './tryFn';
import promised from './promised';

export default promised(function timesLimit(n, limit, iteratee, ...args) {
    return Promise.all(
        new Array(n)
            .fill()
            .map(throat(limit, (item, index) => tryFn(iteratee, index, ...args)))
    );
});
