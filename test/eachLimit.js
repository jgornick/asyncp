import async from '../src/async';
import {
    iterateeDelayWithOrder,
    iterateePromiseWithOrder,
    iterateeNative,
    iterateeNativeWithOrder
} from './helper';

describe('eachLimit', function() {
    it('does delayed items', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const p = async.eachLimit(arr, 2, iterateeDelayWithOrder(order));

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([1, 3, 2, 1, 2]))
        ]);
    });

    it('does sync promise items', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const p = async.eachLimit(arr, 2, iterateePromiseWithOrder(order));
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does sync native items', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const p = async.eachLimit(arr, 2, iterateeNativeWithOrder(order));
        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('does mixed (delayed, promise, native) items', function() {
        let order = [];
        const arr = [3, 2, 1, 4, 5, 6, 9, 8, 7];
        const p = async.eachLimit(arr, 2, value => {
            if (value >= 1 && value <= 3) {
                return new Promise(resolve => setTimeout(
                    () => {
                        order.push(value);
                        resolve(value)
                    },
                    value * 100
                ));
            } else if (value >= 4 && value <= 6) {
                return new Promise(resolve => {
                    order.push(value);
                    resolve(value)
                });
            } else if (value >= 7 && value <= 9) {
                order.push(value);
                return value;
            }
        });

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal([2, 3, 4, 5, 6, 9, 8, 7, 1]))
        ]);
    });

    it('has right arguments', function() {
        const arr = [1, 3, 2];
        return async.eachLimit(arr, 2, (value, index, collection) => {
            switch (value) {
                case 1:
                    index.should.equal(0, `index is invalid for value ${value}`);
                    break;
                case 2:
                    index.should.equal(2, `index is invalid for value ${value}`);
                    break;
                case 3:
                    index.should.equal(1, `index is invalid for value ${value}`);
                    break;
            }

            collection.should.deep.equal(arr, `arr is not equal for value ${value}`);

            return value;
        });
    });

    it('supports empty collections', function() {
        const p = async.eachLimit([], 2, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.eventually.have.length(0)
        ]);
    });

    it('supports empty collections with custom own property', function() {
        let arr = [];
        arr.myProp = 'anything';

        const p = async.eachLimit(arr, 2, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('supports limit greater than collection size', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 20, iterateeNativeWithOrder(order));

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('supports limit equal to collection size', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 10, iterateeNativeWithOrder(order));

        return Promise.all([
            p.should.eventually.deep.equal(arr),
            p.then(() => order.should.deep.equal(arr))
        ]);
    });

    it('resolves after sync array modification with mixed (delayed, sync promise) items', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 3, (value, index, collection) => {
            if (value >= 2 && value <= 6) {
                return new Promise(resolve => {
                    setTimeout(
                        () => {
                            order.push(value);
                            resolve(value);
                        },
                        value * 100
                    );
                });
            } else {
                order.push(value);
                return Promise.resolve(value);
            }
        });

        arr.pop();
        arr.shift();

        return Promise.all([
            p.should.eventually.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
            p.then(() => arr.should.deep.equal([1, 2, 3, 4, 5, 6, 7, 8])),
            p.then(() => order.should.deep.equal([0, 1, 2, 3, 4, 7, 8, 9, 5, 6]))
        ]);
    });

    it('rejects with a 0 limit', function() {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 0, iterateeNative());

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 3, iterateeDelayWithOrder(
            order,
            (x) => x == 2 ? Promise.reject(new Error('error')) : x
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                46 * 25
            ))
        ]);
    });

    it('rejects using sync Promise.reject', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 3, iterateePromiseWithOrder(
            order,
            (x) => x == 2 ? Promise.reject(new Error('error')) : x
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                25
            ))
        ]);
    });

    it('rejects using sync throw', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.eachLimit(arr, 3, iterateeNativeWithOrder(
            order,
            (x) => {
                if (x == 3) {
                    throw new Error('error');
                }
                return x;
            }
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                25
            ))
        ]);
    });

    it('has forEachLimit alias', function(done) {
        assert.strictEqual(async.eachLimit, async.forEachLimit);
        done();
    });
});
