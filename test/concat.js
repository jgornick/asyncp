import async from '../src/async';

describe('concat', function() {
    it('concat, async', function() {
        const arr = [1,3,2];
        const p = async.concat(arr, (x) => new Promise(resolve => setTimeout(() => resolve([x, x + 1]), x * 25)));
        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1,2,3,4,2,3]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('concat, sync promise', function() {
        const arr = [1,3,2];
        const p = async.concat(arr, (x) => Promise.resolve([x, x + 1]));
        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1,2,3,4,2,3]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('concat, sync native', function() {
        const arr = [1,3,2];
        const p = async.concat(arr, (x) => [x, x + 1]);
        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1,2,3,4,2,3]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('concat, sync native nested', function() {
        const arr = [1,3,2];
        const p = async.concat(arr, (x) => [x, [x + 1, x + 2]]);
        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1, [2, 3], 3, [4, 5], 2, [3, 4]]),
            p.should.eventually.not.be.rejected
        ]);
    });

    it('concat has arguments', function() {
        const arr = [1,3,2];
        return async.concat(arr, (value, index, collection) => {
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

    it('concat empty array', function() {
        const p = async.concat([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('concat error, reject', function() {
        const p = async.concat([1,2,3], () => Promise.reject(new Error('error')));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('concat error, throw', function() {
        const p = async.concat([1,2,3], () => { throw new Error('error') });

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('concatSeries, async', function() {
        let order = [];
        const arr = [1,3,2];
        const p = async.concatSeries(arr, (x) => {
            order.push(x);
            return new Promise(resolve => setTimeout(() => resolve([x, x + 1]), x * 25))
        });

        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1,2,3,4,2,3]),
            p.should.eventually.not.be.rejected,
            p.then(() => order.should.have.length(3)),
            p.then(() => order.should.deep.equal([1,3,2]))
        ]);
    });

    it('concatSeries, sync promise', function() {
        let order = [];
        const arr = [1,3,2];
        const p = async.concatSeries(arr, (x) => {
            order.push(x);
            return Promise.resolve([x, x + 1])
        });

        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1,2,3,4,2,3]),
            p.should.eventually.not.be.rejected,
            p.then(() => order.should.have.length(3)),
            p.then(() => order.should.deep.equal([1,3,2]))
        ]);
    });

    it('concatSeries, sync native', function() {
        let order = [];
        const arr = [1,3,2];
        const p = async.concatSeries(arr, (x) => {
            order.push(x);
            return [x, x + 1]
        });

        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1,2,3,4,2,3]),
            p.should.eventually.not.be.rejected,
            p.then(() => order.should.have.length(3)),
            p.then(() => order.should.deep.equal([1,3,2]))
        ]);
    });

    it('concatSeries, sync native nested', function() {
        let order = [];
        const arr = [1,3,2];
        const p = async.concatSeries(arr, (x) => {
            order.push(x);
            return [x, [x + 1, x + 2]]
        });
        return Promise.all([
            p.should.eventually.have.length(6),
            p.should.eventually.deep.equal([1, [2, 3], 3, [4, 5], 2, [3, 4]]),
            p.should.eventually.not.be.rejected,
            p.then(() => order.should.have.length(3)),
            p.then(() => order.should.deep.equal([1,3,2]))
        ]);
    });

    it('concatSeries has arguments', function() {
        const arr = [1,3,2];
        return async.concatSeries(arr, (value, index, collection) => {
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

    it('concatSeries empty array', function() {
        const p = async.concatSeries([], () => assert(false, 'iteratee should not be called'));

        return Promise.all([
            p.should.eventually.have.length(0)
        ]);
    });

    it('concatSeries error, reject', function() {
        const p = async.concatSeries([1,2,3], () => Promise.reject(new Error('error')));

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });

    it('concatSeries error, throw', function() {
        const p = async.concatSeries([1,2,3], () => { throw new Error('error') });

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error)
        ]);
    });
});
