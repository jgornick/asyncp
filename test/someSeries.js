import async from '../src/asyncp';
import {
    iterateeDelayWithOrder,
    iterateePromiseWithOrder,
    iterateeNativeWithOrder
} from './helper';

describe('someSeries', function() {
    it('does delayed items one true', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.someSeries(arr, iterateeDelayWithOrder(order, (x) => x == 1));

        return Promise.all([
            p.should.eventually.equal(true),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                7 * 25
            ))
        ]);
    });

    it('does delayed items multiple true', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.someSeries(arr, iterateeDelayWithOrder(order, (x) => x <= 2));

        return Promise.all([
            p.should.eventually.equal(true),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([3, 2])),
                7 * 25
            ))
        ]);
    });

    it('does delayed items false', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.someSeries(arr, iterateeDelayWithOrder(order, (x) => false));

        return Promise.all([
            p.should.eventually.equal(false),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                7 * 25
            ))
        ]);
    });

    it('does sync promise items', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.someSeries(arr, iterateePromiseWithOrder(order, (x) => x >= 1));
        return Promise.all([
            p.should.eventually.equal(true),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([3])),
                7 * 25
            ))
        ]);
    });

    it('does sync native items', function() {
        let order = [];
        const arr = [3, 2, 1];
        const p = async.someSeries(arr, iterateeNativeWithOrder(order, (x) => x >= 1));
        return Promise.all([
            p.should.eventually.equal(true),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([3])),
                7 * 25
            ))
        ]);
    });

    it('does mixed (delayed, promise, native) items', function() {
        let order = [];
        const arr = [3, 2, 1, 4, 5, 6, 9, 8, 7];
        const p = async.someSeries(arr, value => {
            if (value >= 1 && value <= 3) {
                return new Promise(resolve => setTimeout(
                    () => {
                        order.push(value);
                        resolve(value >= 8)
                    },
                    value * 10
                ));
            } else if (value >= 4 && value <= 6) {
                return new Promise(resolve => {
                    order.push(value);
                    resolve(value >= 8)
                });
            } else if (value >= 7 && value <= 9) {
                order.push(value);
                return value >= 8;
            }
        });

        return Promise.all([
            p.should.eventually.equal(true),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([3, 2, 1, 4, 5, 6, 9])),
                46 * 10
            ))
        ]);
    });

    it('has right arguments', function() {
        const arr = [1, 3, 2];
        return async.someSeries(arr, (value, index, collection) => {
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
        const p = async.someSeries(
            new Promise(resolve => setTimeout(resolve.bind(null, arr), 25)),
            iterateeDelayWithOrder(order, (x) => x == 1)
        );

        return Promise.all([
            p.should.eventually.equal(true),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                8 * 25
            ))
        ]);
    });

    it('supports empty collections', function() {
        const p = async.someSeries([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.equal(false)
        ]);
    });

    it('supports external array modification with mixed (delayed, sync promise) items', function() {
        let order = [];
        let arr = [4, 3, 2, 1];
        const p = async.someSeries(arr, (value, index, collection) => {
            if (value >= 2 && value <= 3) {
                return new Promise(resolve => {
                    setTimeout(
                        () => {
                            order.push(value);
                            resolve(value < 3);
                        },
                        value * 25
                    );
                });
            } else {
                order.push(value);
                return Promise.resolve(value < 3);
            }
        });

        arr.pop();
        arr.shift();

        return Promise.all([
            p.should.eventually.equal(true),
            p.then(() => arr.should.deep.equal([3, 2])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([3, 2])),
                11 * 25
            ))
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.someSeries(arr, iterateeDelayWithOrder(
            order,
            (x) => x == 3 ? Promise.reject(new Error('error')) : false
        ));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3])),
                7 * 25
            ))
        ]);
    });

    it('rejects using sync Promise.reject', function() {
        let order = [];
        const arr = [1, 3, 2];
        const p = async.someSeries(arr, iterateePromiseWithOrder(
            order,
            (x) => x == 3 ? Promise.reject(new Error('error')) : false
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
        const p = async.someSeries(arr, iterateeNativeWithOrder(
            order,
            (x) => {
                if (x == 3) {
                    throw new Error('error');
                }
                return false;
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

    it('has anySeries alias', function(done) {
        assert.strictEqual(async.someSeries, async.anySeries);
        done();
    });
});
