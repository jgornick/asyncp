import async from '../src/async';

describe('applyEachSeries', function() {
    function addDelayed(order, x) {
        return new Promise(resolve => setTimeout(
            _ => {
                order.push('addDelayed');
                resolve(x + 1);
            },
            25
        ));
    }

    function addPromise(order, x) {
        order.push('addPromise');
        return new Promise(resolve => resolve(x + 2));
    }

    function addNative(order, x) {
        order.push('addNative');
        return x + 3;
    }

    function rejectDelayed(order, x) {
        return new Promise((_, reject) => setTimeout(
            _ => {
                order.push('rejectDelayed');
                reject(new Error());
            },
            15
        ));
    }

    function rejectPromise(order, x) {
        order.push('rejectPromise');
        return Promise.reject(new Error());
    }

    function rejectThrow(order, x) {
        order.push('rejectThrow');
        throw new Error();
    }

    it('applies arguments', function() {
        let order = [];
        const arr = [addDelayed, addNative, addPromise];
        const p = async.applyEachSeries(arr, order, 0);
        return Promise.all([
            p.should.eventually.deep.equal([1, 3, 2]),
            p.then(() => order.should.deep.equal(['addDelayed', 'addNative', 'addPromise']))
        ]);
    });

    it('returns partial function', function() {
        let order = [];
        const arr = [addDelayed, addNative, addPromise];
        const f = async.applyEachSeries(arr);
        const p = f(order, 0);
        return Promise.all([
            p.should.eventually.deep.equal([1, 3, 2]),
            p.then(() => order.should.deep.equal(['addDelayed', 'addNative', 'addPromise']))
        ]);
    });

    it('supports empty collections', function() {
        let order = [];
        const p = async.applyEachSeries([], 0);
        return Promise.all([
            p.should.eventually.deep.equal([])
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const arr = [addDelayed, rejectDelayed, addPromise];
        const p = async.applyEachSeries(arr, order, 0);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(['addDelayed', 'rejectDelayed'])),
                2 * 25
            ))
        ]);
    });

    it('rejects using Promise.reject', function() {
        let order = [];
        const arr = [addPromise, rejectPromise, addDelayed];
        const p = async.applyEachSeries(arr, order, 0);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(['addPromise', 'rejectPromise'])),
                2 * 25
            ))
        ]);
    });

    it('rejects using sync throw', function() {
        let order = [];
        const arr = [addDelayed, rejectThrow, addPromise];
        const p = async.applyEachSeries(arr, order, 0);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal(['addDelayed', 'rejectThrow'])),
                2 * 25
            ))
        ]);
    });
});
