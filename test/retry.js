import async from '../src/asyncp';
import { delayedTask, promiseTask, nativeTask } from './helper';

describe('retry', function() {
    function successTask(results, order, counter) {
        counter.count++;
        order.push(counter.count);
        if (counter.count < 3) {
            throw new Error('error');
        } else {
            return counter.count;
        }
    }

    function successTaskWithMultipeArgs(results, order, counter) {
        counter.count++;
        order.push(counter.count);
        if (counter.count < 3) {
            throw new Error('error');
        } else {
            return [counter.count, 1, 2, 3];
        }
    }

    function failTask(results, order, counter) {
        counter.count++;
        order.push(counter.count);
        throw new Error('error');
    }

    it('retries until delayed success', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(delayedTask(1, successTask), order, counter);

        return Promise.all([
            p.should.eventually.deep.equal(3),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until promise success', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(promiseTask(1, successTask), order, counter);
        return Promise.all([
            p.should.eventually.deep.equal(3),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until native success', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(nativeTask(1, successTask), order, counter);
        return Promise.all([
            p.should.eventually.deep.equal(3),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until delayed fails', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(delayedTask(1, failTask), order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3, 4, 5]))
        ]);
    });

    it('retries until promise fails', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(promiseTask(1, failTask), order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3, 4, 5]))
        ]);
    });

    it('retries until native fails', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(nativeTask(1, failTask), order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3, 4, 5]))
        ]);
    });

    it('retries until delayed fails with custom times number', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry(3, delayedTask(1, failTask), order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until delayed fails with custom times object', function() {
        let order = [];
        let counter = { count: 0 };
        const p = async.retry({ times: 3 }, delayedTask(1, failTask), order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until native fails with custom times object and interval number', function() {
        let order = [];
        let counter = { count: 0 };
        const timeStart = +new Date;
        const p = async.retry({ times: 3, interval: 100 }, nativeTask(1, failTask), order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => {
                let now = +new Date;
                assert(now - timeStart >= 200, `interval ${now - timeStart}ms should be at least 200ms total`)
            }),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until native fails with custom times object and interval function', function() {
        let order = [];
        let counter = { count: 0 };
        let intervalCounter = 0;
        const timeStart = +new Date;
        const p = async.retry(
            {
                times: 3,
                interval: (retryCount, results) => {
                    intervalCounter = retryCount;
                    retryCount.should.equal(results.length, 'retryCount does not match results.length in interval');
                    return 100;
                }
            },
            nativeTask(1, failTask),
            order,
            counter
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => {
                let now = +new Date;
                assert(now - timeStart >= 200, `interval ${now - timeStart}ms should be at least 200ms total`)
            }),
            p.catch(() => intervalCounter.should.equal(2)),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('throws with invalid times value', function(done) {
        expect(async.retry.bind(null, 'foo', delayedTask(1, failTask)))
            .to.throw(Error, `Invalid times option value of "foo"`)
        done();
    });

    it('throws with invalid times option', function(done) {
        expect(async.retry.bind(null, { times: 'foo' }, delayedTask(1, failTask)))
            .to.throw(Error, `Invalid times option value of "foo"`)
        done();
    });
});
