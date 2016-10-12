import async from '../src/asyncp';
import {
    iterateeDelayWithOrder,
    iterateePromiseWithOrder,
    iterateeNativeWithOrder
} from './helper';

describe('detectLimit', function() {
    it('does delayed items', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const p = async.detectLimit(arr, 2, iterateeDelayWithOrder(order, (x) => x == 2));

        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3, 2, 1, 2])),
                9 * 25
            ))
        ]);
    });

    it('does sync promise items', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const p = async.detectLimit(arr, 2, iterateePromiseWithOrder(order, (x) => x == 2));
        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                9 * 25
            ))
        ]);
    });

    it('does sync native items', function() {
        let order = [];
        const arr = [3, 1, 2, 1, 2];
        const p = async.detectLimit(arr, 2, iterateeNativeWithOrder(order, (x) => x == 2));
        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                4 * 25
            ))
        ]);
    });

    it('does mixed (delayed, promise, native) items', function() {
        let order = [];
        const arr = [3, 2, 1, 4, 5, 6, 9, 8, 7];
        const p = async.detectLimit(arr, 2, value => {
            if (value >= 1 && value <= 3) {
                return new Promise(resolve => setTimeout(
                    () => {
                        order.push(value);
                        resolve(value == 2)
                    },
                    value * 25
                ));
            } else if (value >= 4 && value <= 6) {
                return new Promise(resolve => {
                    order.push(value);
                    resolve(false)
                });
            } else if (value >= 7 && value <= 9) {
                order.push(value);
                return false;
            }
        });

        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([2, 3, 4, 5, 6, 9, 8, 7, 1])),
                10 * 25
            ))
        ]);
    });

    it('supports delayed with multiple matches', function() {
        let order = [];
        let isMatched = false;
        const arr = [3, 2, 2, 4, 2];
        const p = async.detectLimit(arr, 2, iterateeDelayWithOrder(order, (x) => {
            if (x == 2) {
                if (isMatched == false) {
                    isMatched = true;
                    order.push('match');
                }
                return true;
            }
            return false;
        }));

        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([2, 'match', 3, 2, 2, 4])),
                10 * 25
            ))
        ]);
    });

    it('has right arguments', function() {
        const arr = [1, 3, 2];
        return async.detectLimit(arr, 2, (value, index, collection) => {
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
        const arr = [3, 1, 2, 1, 2];
        const p = async.detectLimit(
            new Promise(resolve => setTimeout(resolve.bind(null, arr), 25)),
            2,
            iterateeDelayWithOrder(order, (x) => x == 2)
        );

        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3, 2, 1, 2])),
                9 * 25
            ))
        ]);
    });

    it('supports not found', function() {
        const p = async.detectLimit([1, 2, 3], 2, () => false);

        return Promise.all([
            p.should.eventually.be.undefined
        ]);
    });

    it('supports not found with custom default', function() {
        const p = async.detectLimit([1, 2, 3], 2, () => false, 'DEFAULT');

        return Promise.all([
            p.should.eventually.equal('DEFAULT')
        ]);
    });

    it('supports empty collections', function() {
        const p = async.detectLimit([], 2, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.be.undefined
        ]);
    });

    it('supports empty collections with custom default', function() {
        const p = async.detectLimit([], 2, () => {}, 'DEFAULT');

        return Promise.all([
            p.should.eventually.equal('DEFAULT')
        ]);
    });

    it('supports limit greater than collection size', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.detectLimit(arr, 20, iterateeNativeWithOrder(order, x => x == 2));

        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                25
            ))
        ]);
    });

    it('supports limit equal to collection size', function() {
        let order = [];
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.detectLimit(arr, 10, iterateeNativeWithOrder(order, x => x == 2));

        return Promise.all([
            p.should.eventually.equal(2),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(arr)),
                25
            ))
        ]);
    });

    it('supports external array modification with mixed (delayed, sync promise) items', function() {
        let order = [];
        let arr = [4, 3, 2, 1];
        const p = async.detectLimit(arr, 2, (value, index, collection) => {
            if (value >= 2 && value <= 3) {
                return new Promise(resolve => {
                    setTimeout(
                        () => {
                            order.push(value);
                            resolve(value == 2);
                        },
                        value * 25
                    );
                });
            } else {
                order.push(value);
                return Promise.resolve(false);
            }
        });

        arr.pop();
        arr.shift();

        return Promise.all([
            p.should.eventually.equal(2),
            p.then(() => arr.should.deep.equal([3, 2])),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([2, 3])),
                7 * 25
            ))
        ]);
    });

    it('rejects with a 0 limit', function() {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p = async.detectLimit(arr, 0, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [1, 4, 1];
        const p = async.detectLimit(arr, 2, iterateeDelayWithOrder(
            order,
            (x) => x == 4 ? Promise.reject(new Error('error')) : false
        ));

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
        const arr = [1, 3, 2];
        const p = async.detectLimit(arr, 2, iterateePromiseWithOrder(
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
        const p = async.detectLimit(arr, 2, iterateeNativeWithOrder(
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

    it('has findLimit alias', function(done) {
        assert.strictEqual(async.detectLimit, async.findLimit);
        done();
    });
});
