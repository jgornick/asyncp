import async from '../src/asyncp';
import {
    iterateeDelayWithOrder,
    iterateePromiseWithOrder,
    iterateeNativeWithOrder
} from './helper';

describe('filter', function() {
    it('does delayed items with single match', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.filter(arr, iterateeDelayWithOrder(order, (x) => x == 2));

        return Promise.all([
            p.should.eventually.deep.equal([2]),
            p.then(() => arr.should.deep.equal([3, 2, 1])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2, 3])),
                4 * 25
            ))
        ]);
    });

    it('does delayed items with multiple match', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.filter(arr, iterateeDelayWithOrder(order, (x) => x <= 2));

        return Promise.all([
            p.should.eventually.deep.equal([2, 1]),
            p.then(() => arr.should.deep.equal([3, 2, 1])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2, 3])),
                4 * 25
            ))
        ]);
    });

    it('does delayed items with multiple equal match', function() {
        let order = [];
        const arr = [3, 2, 1, 2, 2];
        const p = async.filter(arr, iterateeDelayWithOrder(order, (x) => x == 2));

        return Promise.all([
            p.should.eventually.deep.equal([2, 2, 2]),
            p.then(() => arr.should.deep.equal([3, 2, 1, 2, 2])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2, 2, 2, 3])),
                4 * 25
            ))
        ]);
    });

    it('does sync promise items', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.filter(arr, iterateePromiseWithOrder(order, (x) => x <= 2));
        return Promise.all([
            p.should.eventually.deep.equal([2, 1]),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                4 * 25
            ))
        ]);
    });

    it('does sync native items', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.filter(arr, iterateeNativeWithOrder(order, (x) => x <= 2));
        return Promise.all([
            p.should.eventually.deep.equal([2, 1]),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                4 * 25
            ))
        ]);
    });

    it('does mixed (delayed, promise, native) items', function() {
        let order = [];
        const arr = [3, 2, 1, 4, 5, 6, 9, 8, 7];
        const p = async.filter(arr, value => {
            if (value >= 1 && value <= 3) {
                return new Promise(resolve => setTimeout(
                    () => {
                        order.push(value);
                        resolve(value > 2 && value < 6)
                    },
                    value * 25
                ));
            } else if (value >= 4 && value <= 6) {
                return new Promise(resolve => {
                    order.push(value);
                    resolve(value > 2 && value < 6)
                });
            } else if (value >= 7 && value <= 9) {
                order.push(value);
                return value > 2 && value < 6;
            }
        });

        return Promise.all([
            p.should.eventually.deep.equal([3, 4, 5]),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([4, 5, 6, 9, 8, 7, 1, 2, 3])),
                10 * 25
            ))
        ]);
    });

    it('has right arguments', function() {
        const arr = [1, 3, 2];
        return async.filter(arr, (value, index, collection) => {
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

    it('supports promised arguments', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.filter(
            new Promise(resolve => setTimeout(resolve.bind(null, arr), 25)),
            iterateeDelayWithOrder(order, (x) => x == 2)
        );

        return Promise.all([
            p.should.eventually.deep.equal([2]),
            p.then(() => arr.should.deep.equal([3, 2, 1])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2, 3])),
                5 * 25
            ))
        ]);
    });

    it('supports not found', function() {
        const p = async.filter([1, 2, 3], () => false);

        return Promise.all([
            p.should.eventually.deep.equal([])
        ]);
    });

    it('supports empty collections', function() {
        const p = async.filter([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.deep.equal([])
        ]);
    });

    it('supports external array modification with mixed (delayed, sync promise) items', function() {
        let order = [];
        let arr = [4, 3, 2, 1];
        const p = async.filter(arr, (value, index, collection) => {
            if (value >= 2 && value <= 3) {
                return new Promise(resolve => {
                    setTimeout(
                        () => {
                            order.push(value);
                            resolve(value <= 2);
                        },
                        value * 25
                    );
                });
            } else {
                order.push(value);
                return Promise.resolve(value <= 2);
            }
        });

        arr.pop();
        arr.shift();

        return Promise.all([
            p.should.eventually.deep.equal([2]),
            p.then(() => arr.should.deep.equal([3, 2])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([2, 3])),
                5 * 25
            ))
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.filter(arr, iterateeDelayWithOrder(
            order,
            (x) => x == 2 ? Promise.reject(new Error('error')) : false
        ));

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
        const p = async.filter(arr, iterateePromiseWithOrder(
            order,
            (x) => x == 3 ? Promise.reject(new Error('error')) : false
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
        const arr = [1, 3, 2];
        const p = async.filter(arr, iterateeNativeWithOrder(
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

    it('has select alias', function(done) {
        assert.strictEqual(async.filter, async.select);
        done();
    });
});
