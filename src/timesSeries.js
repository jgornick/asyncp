import tryFn from './tryFn';
import promised from './promised';

export default promised(function timesSeries(n, iteratee, ...args) {
    return new Array(n).fill()
        .reduce(
            (promise, item, index) => {
                return promise.then((results) => {
                    return tryFn(iteratee, index, ...args)
                        .then((result) => {
                            results.push(result);
                            return results;
                        });
                });
            },
            Promise.resolve([])
        );
});
