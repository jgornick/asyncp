import async from '../src/asyncp';
import { delayedWithOrder, promiseWithOrder, nativeWithOrder } from './helper';

describe('parallel', function() {
    it('does delayed tasks', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue =>
            delayedWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallel(tasks, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('does promise tasks', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue =>
            promiseWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallel(tasks, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does native tasks', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            })
        );
        const p = async.parallel(tasks, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does mixed tasks', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue => {
            let task;

            if (indexValue == 1) {
                task = delayedWithOrder;
            } else if (indexValue == 3) {
                task = promiseWithOrder;
            } else if (indexValue == 2) {
                task = nativeWithOrder;
            }

            return task(order, indexValue, (value, index) => {
                value.should.equal(0);
                return index;
            });
        });
        const p = async.parallel(tasks, 0);
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([3, 2, 1]))
        ]);
    });

    it('supports empty tasks', function() {
        const p = async.parallel([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('supports empty tasks with custom own property', function() {
        let tasks = [];
        tasks.myProp = 'anything';

        const p = async.parallel(tasks, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
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
        const p = async.parallel(tasks, 0);

        tasks.pop();
        tasks.shift();

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => tasks.should.have.length(2)),
            p.then(() => order.should.deep.equal([4, 1, 2, 3]))
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue =>
            delayedWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                if (index == 2) {
                    throw new Error('error');
                } else {
                    return index;
                }
            })
        );
        const p = async.parallel(tasks, 0);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2, 3])),
                4 * 25
            ))
        ]);
    });

    it('rejects using sync Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue =>
            promiseWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                if (index == 2) {
                    throw new Error('error');
                } else {
                    return index;
                }
            })
        );
        const p = async.parallel(tasks, 0);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3, 2])),
                25
            ))
        ]);
    });

    it('rejects using sync throw', function() {
        let order = [];
        const arr = [1, 3, 2];
        const tasks = arr.map(indexValue =>
            nativeWithOrder(order, indexValue, (value, index) => {
                value.should.equal(0);
                if (index == 2) {
                    throw new Error('error');
                } else {
                    return index;
                }
            })
        );
        const p = async.parallel(tasks, 0);


        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3, 2])),
                25
            ))
        ]);
    });
});
