import async from '../src/asyncp';
import { delayedWithOrder, promiseWithOrder, nativeWithOrder } from './helper';

describe('parallelLimit', function() {
    it('does delayed tasks', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const tasks = arr.map(indexValue =>
            delayedWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallelLimit(tasks, 2, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([1, 3, 2, 1, 2]))
        ]);
    });

    it('does promise tasks', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const tasks = arr.map(indexValue =>
            promiseWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallelLimit(tasks, 2, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([3, 1, 2, 1, 2]))
        ]);
    });

    it('does native tasks', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallelLimit(tasks, 2, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([3, 1, 2, 1, 2]))
        ]);
    });

    it('does mixed tasks', function() {
        let order = [];
        const arr = [3, 2, 1, 4, 5, 6, 9, 8, 7];
        const tasks = arr.map(indexValue => {
            let task;

            if (indexValue >= 1 && indexValue <= 3) {
                task = delayedWithOrder;
            } else if (indexValue >= 4 && indexValue <= 6) {
                task = promiseWithOrder;
            } else if (indexValue >= 7 && indexValue <= 9) {
                task = nativeWithOrder;
            }

            return task(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            });
        });

        const p = async.parallelLimit(tasks, 2, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([2, 3, 4, 5, 6, 9, 8, 7, 1]))
        ]);
    });

    it('supports empty tasks', function() {
        const p = async.parallelLimit([], 2, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('supports empty tasks with custom own property', function() {
        let tasks = [];
        tasks.myProp = 'anything';

        const p = async.parallelLimit(tasks, 2, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('supports limit greater than collection size', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallelLimit(tasks, 20, 0);

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('supports limit equal to collection size', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallelLimit(tasks, 10, 0);

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('supports external array modification with mixed (delayed, sync promise) items', function() {
        let order = [];
        const arr = [4, 3, 2, 1];
        const tasks = arr.map(indexValue => {
            let task;

            if (indexValue >= 2 && indexValue <= 3) {
                task = delayedWithOrder;
            } else if (indexValue == 4) {
                task = promiseWithOrder;
            } else if (indexValue == 1) {
                task = nativeWithOrder;
            }

            return task(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            });
        });
        const p = async.parallelLimit(tasks, 2, 0);

        tasks.pop();
        tasks.shift();

        return Promise.all([
            p.should.eventually.deep.equal([4, 3, 2, 1]),
            p.then(() => tasks.should.have.length(2)),
            p.then(() => order.should.deep.equal([4, 2, 1, 3]))
        ]);
    });

    it('rejects with a 0 limit', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallelLimit(tasks, 0, 0);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [1, 4, 1];
        const tasks = arr.map(indexValue =>
            delayedWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                if (index == 4) {
                    throw new Error('error');
                } else {
                    return index;
                }
            })
        );
        const p = async.parallelLimit(tasks, 2, 0);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 1, 4])),
                6 * 25
            ))
        ]);
    });

    it('rejects using sync Promise.reject', function() {
        let order = [];
        const arr = [1, 4, 2];
        const tasks = arr.map(indexValue =>
            promiseWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                if (index == 4) {
                    throw new Error('error');
                } else {
                    return index;
                }
            })
        );
        const p = async.parallelLimit(tasks, 2, 0);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 4, 2])),
                7 * 25
            ))
        ]);
    });

    it('rejects using sync throw', function() {
        let order = [];
        const arr = [1, 4, 2];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                if (index == 4) {
                    throw new Error('error');
                } else {
                    return index;
                }
            })
        );
        const p = async.parallelLimit(tasks, 2, 0);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 4, 2])),
                7 * 25
            ))
        ]);
    });
});
