import async from '../src/async';
import { delayedTask, promiseTask, nativeTask } from './helper';

describe('retryable', function() {
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
        const f = async.retryable(delayedTask(1, successTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.deep.equal(3),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until promise success', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable(promiseTask(1, successTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.deep.equal(3),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until native success', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable(nativeTask(1, successTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.deep.equal(3),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until delayed fails', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable(delayedTask(1, failTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3, 4, 5]))
        ]);
    });

    it('retries until promise fails', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable(promiseTask(1, failTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3, 4, 5]))
        ]);
    });

    it('retries until native fails', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable(nativeTask(1, failTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3, 4, 5]))
        ]);
    });

    it('retries until delayed fails with custom times number', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable(3, delayedTask(1, failTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until delayed fails with custom times object', function() {
        let order = [];
        let counter = { count: 0 };
        const f = async.retryable({ times: 3 }, delayedTask(1, failTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until native fails with custom times object and interval number', function() {
        let order = [];
        let counter = { count: 0 };
        const timeStart = +new Date;
        const f = async.retryable({ times: 3, interval: 100 }, nativeTask(1, failTask));
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => assert(+new Date - timeStart > 200, 'interval should be at least 200ms total')),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('retries until native fails with custom times object and interval function', function() {
        let order = [];
        let counter = { count: 0 };
        let intervalCounter = 0;
        const timeStart = +new Date;
        const f = async.retryable(
            {
                times: 3,
                interval: (retryableCount, results) => {
                    intervalCounter = retryableCount;
                    retryableCount.should.equal(results.length, 'retryableCount does not match results.length in interval');
                    return 100;
                }
            },
            nativeTask(1, failTask)
        );
        const p = f(order, counter);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => assert(+new Date - timeStart > 200, 'interval should be at least 200ms total')),
            p.catch(() => intervalCounter.should.equal(2)),
            p.catch(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });
});
