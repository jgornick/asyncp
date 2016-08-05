import async from '../src/async';

describe('each', function() {
    function eachIteratee(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), x * 25));
    }

    it('each, async', function() {
        const p = async.each([1,3,2], eachIteratee);
        return Promise.all([
            p.should.eventually.have.length(3),
            p.should.eventually.deep.equal([1,3,2]),
            p.should.not.be.rejected
        ]);
    });

    it('each, sync promise', function() {
        const p = async.each([1,3,2], (x) => Promise.resolve(x));
        return Promise.all([
            p.should.eventually.have.length(3),
            p.should.eventually.deep.equal([1,3,2]),
            p.should.not.be.rejected
        ]);
    });

    it('each, sync native', function() {
        const p = async.each([1,3,2], (x) => x);
        return Promise.all([
            p.should.eventually.have.length(3),
            p.should.eventually.deep.equal([1,3,2]),
            p.should.not.be.rejected
        ]);
    });

    it('each has arguments', function() {
        const arr = [1, 3, 2];
        return async.each(arr, (value, index, collection) => {
            switch (value) {
                case 1:
                    value.should.equal(1);
                    index.should.equal(0);
                    break;
                case 2:
                    value.should.equal(2);
                    index.should.equal(2);
                    break;
                case 3:
                    value.should.equal(3);
                    index.should.equal(1);
                    break;
            }

            collection.should.deep.equal(arr, `arr is not equal for value ${value}`);

            return value;
        });
    });

    it('each empty array', function() {
        const p = async.each([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('each empty array, with other property on the array', function() {
        let myArray = [];
        myArray.myProp = 'anything';

        const p = async.each(myArray, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('each error, reject', function() {
        const p = async.each([1,2,3], () => Promise.reject(new Error('error')));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('each error, throw', function() {
        const p = async.each([1,2,3], () => { throw new Error('error') });

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('eachSeries, async', function() {
        const p = async.eachSeries([1,3,2], eachIteratee);
        return Promise.all([
            p.should.eventually.have.length(3),
            p.should.eventually.deep.equal([1,3,2]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachSeries, sync promise', function() {
        const p = async.eachSeries([1,3,2], (x) => Promise.resolve(x));
        return Promise.all([
            p.should.eventually.have.length(3),
            p.should.eventually.deep.equal([1,3,2]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachSeries, sync native', function() {
        const p = async.eachSeries([1,3,2], (x) => x);
        return Promise.all([
            p.should.eventually.have.length(3),
            p.should.eventually.deep.equal([1,3,2]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachSeries has arguments', function() {
        const arr = [1, 3, 2];
        return async.eachSeries(arr, (value, index, collection) => {
            switch (value) {
                case 1:
                    value.should.equal(1);
                    index.should.equal(0);
                    break;
                case 2:
                    value.should.equal(2);
                    index.should.equal(2);
                    break;
                case 3:
                    value.should.equal(3);
                    index.should.equal(1);
                    break;
            }

            collection.should.deep.equal(arr, `arr is not equal for value ${value}`);

            return value;
        });
    });

    it('eachSeries empty array', function() {
        const p = async.eachSeries([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('eachSeries array modification', function() {
        const arr = [1, 2, 3, 4];
        const p = async.eachSeries(arr, (value, index, collection) => {
            return new Promise(resolve => {
                collection.should.deep.equal(arr, `arr is not equal for value ${value}`);
                setTimeout(() => resolve(value), value * 25);
            });
        });

        arr.pop();
        arr.splice(0, 1);

        arr.should.deep.equal([2,3]);

        return Promise.all([
            p.should.eventually.have.length(4),
            p.should.eventually.deep.equal([1,2,3,4]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachSeries break early', function() {
        const p = async.eachSeries([1,3,2], (x) => x == 2 ? false : x);
        return Promise.all([
            p.should.eventually.have.length(2),
            p.should.eventually.deep.equal([1,3]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachSeries error, reject', function() {
        const p = async.eachSeries([1,2,3], () => Promise.reject(new Error('error')));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('eachSeries error, throw', function() {
        const p = async.eachSeries([1,2,3], () => { throw new Error('error') });

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('eachLimit, async', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 2, eachIteratee);

        return Promise.all([
            p.should.eventually.have.length(10),
            p.should.eventually.deep.equal(arr),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachLimit, sync promise', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 2, (x) => Promise.resolve(x));
        return Promise.all([
            p.should.eventually.have.length(10),
            p.should.eventually.deep.equal(arr),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachLimit, sync native', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 2, (x) => x);
        return Promise.all([
            p.should.eventually.have.length(10),
            p.should.eventually.deep.equal(arr),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachLimit has arguments', function() {
        const arr = [1, 3, 2];
        return async.eachLimit(arr, 2, (value, index, collection) => {
            switch (value) {
                case 1:
                    value.should.equal(1);
                    index.should.equal(0);
                    break;
                case 2:
                    value.should.equal(2);
                    index.should.equal(2);
                    break;
                case 3:
                    value.should.equal(3);
                    index.should.equal(1);
                    break;
            }

            collection.should.deep.equal(arr, `arr is not equal for value ${value}`);

            return value;
        });
    });

    it('eachLimit empty array', function() {
        const p = async.eachLimit([], 2, () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.eventually.have.length(0)
        ]);
    });

    it('eachLimit limit exceeds size', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 20, eachIteratee);

        return Promise.all([
            p.should.eventually.have.length(10),
            p.should.eventually.deep.equal(arr),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachLimit limit equal size', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 10, eachIteratee);

        return Promise.all([
            p.should.eventually.have.length(10),
            p.should.eventually.deep.equal(arr),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('eachLimit limit 0 size', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 0, eachIteratee);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('eachLimit error, reject', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 3, (x) => x == 2 ? Promise.reject(new Error('error')) : x);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('eachLimit error, throw', function() {
        const arr = [0,1,2,3,4,5,6,7,8,9];
        const p = async.eachLimit(arr, 3, (x) => {
            if (x == 2) {
                throw new Error('error');
            }
            return x;
        });

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('forEach alias', function(done) {
        assert.strictEqual(async.each, async.forEach);
        done();
    });

    it('forEachSeries alias', function(done) {
        assert.strictEqual(async.eachSeries, async.forEachSeries);
        done();
    });

    it('forEachLimit alias', function(done) {
        assert.strictEqual(async.eachLimit, async.forEachLimit);
        done();
    });
});
