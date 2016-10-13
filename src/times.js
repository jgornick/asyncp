import tryFn from './tryFn';
import promised from './promised';

export default promised(function times(n, iteratee, ...args) {
    return Promise.all(
        new Array(n)
            .fill()
            .map((item, index) => tryFn(iteratee, index, ...args))
    );
});
