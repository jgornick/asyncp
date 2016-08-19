import async from '../src/async';
import {
    accIterateeDelayWithOrder,
    accIterateePromiseWithOrder,
    accIterateeNativeWithOrder
} from './helper';

describe('reduce', function() {
    it('does delayed items', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.reduce(arr, 0, accIterateeDelayWithOrder(order, (acc, x) => acc + x));
        return Promise.all([
            p.should.eventually.equal(6),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does sync promise items', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.reduce(arr, 0, accIterateePromiseWithOrder(order, (acc, x) => acc + x));
        return Promise.all([
            p.should.eventually.equal(6),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does sync native items', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.reduce(arr, 0, accIterateeNativeWithOrder(order, (acc, x) => acc + x));
        return Promise.all([
            p.should.eventually.equal(6),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does mixed (delayed, promise, native) items', function() {
        let order = [];
        const arr = [3, 2, 1, 4, 5, 6, 9, 8, 7];
        const p = async.reduce(arr, 0, (acc, value) => {
            if (value >= 1 && value <= 3) {
                return new Promise(resolve => setTimeout(
                    () => {
                        order.push(value);
                        resolve(acc + value)
                    },
                    value * 25
                ));
            } else if (value >= 4 && value <= 6) {
                return new Promise(resolve => {
                    order.push(value);
                    resolve(acc + value)
                });
            } else if (value >= 7 && value <= 9) {
                order.push(value);
                return acc + value;
            }
        });

        return Promise.all([
            p.should.eventually.equal(45),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('has right arguments', function() {
        const arr = [1, 3, 2];
        return async.reduce(arr, 0, (acc, value, index, collection) => {
            switch (value) {
                case 1:
                    acc.should.equal(0, `acc is invalid for value ${value}`)
                    index.should.equal(0, `index is invalid for value ${value}`);
                    break;
                case 2:
                    acc.should.equal(4, `acc is invalid for value ${value}`)
                    index.should.equal(2, `index is invalid for value ${value}`);
                    break;
                case 3:
                    acc.should.equal(1, `acc is invalid for value ${value}`)
                    index.should.equal(1, `index is invalid for value ${value}`);
                    break;
            }

            collection.should.deep.equal(arr, `arr is not equal for value ${value}`);

            return acc + value;
        });
    });

    it('supports empty collections', function() {
        const p = async.reduce([], 0, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.equal(0)
        ]);
    });

    it('supports empty collections with custom own property', function() {
        let arr = [];
        arr.myProp = 'anything';

        const p = async.reduce(arr, 0, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.equal(0)
        ]);
    });

    it('supports external array modification with mixed (delayed, sync promise) items', function() {
        let order = [];
        let arr = [4, 3, 2, 1];
        const p = async.reduce(arr, 0, (acc, value, index, collection) => {
            if (value >= 2 && value <= 3) {
                return new Promise(resolve => {
                    setTimeout(
                        () => {
                            order.push(value);
                            resolve(acc + value);
                        },
                        value * 25
                    );
                });
            } else {
                order.push(value);
                return Promise.resolve(acc + value);
            }
        });

        arr.pop();
        arr.shift();

        return Promise.all([
            p.should.eventually.equal(10),
            p.then(() => arr.should.deep.equal([3, 2])),
            p.then(() => order.should.deep.equal([4, 3, 2, 1]))
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.reduce(arr, 0, accIterateeDelayWithOrder(
            order,
            (acc, x) => x == 2 ? Promise.reject(new Error('error')) : acc + x
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                7 * 25
            ))
        ]);
    });

    it('rejects using sync Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.reduce(arr, 0, accIterateePromiseWithOrder(
            order,
            (acc, x) => x == 3 ? Promise.reject(new Error('error')) : acc + x
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3])),
                25
            ))
        ]);
    });

    it('rejects using sync throw', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.reduce(arr, 0, accIterateeNativeWithOrder(
            order,
            (acc, x) => {
                if (x == 3) {
                    throw new Error('error');
                }
                return acc + x;
            }
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3])),
                25
            ))
        ]);
    });

    it('has foldl alias', function(done) {
        assert.strictEqual(async.reduce, async.foldl);
        done();
    });

    it('has inject alias', function(done) {
        assert.strictEqual(async.reduce, async.inject);
        done();
    });
});
