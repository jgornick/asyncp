import async from '../src/asyncp';
import { delayedTask, promiseTask, nativeTask } from './helper';

describe('timesSeries', function() {
    function successTask(index, order) {
        order.push(index);
        return index;
    }

    function failTask(index, order) {
        order.push(index);
        if (index == 2) {
            throw new Error(index);
        } else {
            return index;
        }
    }

    it('iterates n times with delayed', function() {
        let order = [];
        const p = async.timesSeries(
            5,
            (index, order) => new Promise(resolve => setTimeout(_ => {
                order.push(index);
                resolve(index);
            }, (5 - index) * 25)),
            order
        );

        return Promise.all([
            p.should.eventually.deep.equal([0, 1, 2, 3, 4]),
            p.then(() => order.should.deep.equal([0, 1, 2, 3, 4]))
        ]);
    });

    it('iterates n times with promise', function() {
        let order = [];
        const p = async.timesSeries(5, promiseTask(1, successTask), order);

        return Promise.all([
            p.should.eventually.deep.equal([0, 1, 2, 3, 4]),
            p.then(() => order.should.deep.equal([0, 1, 2, 3, 4]))
        ]);
    });

    it('iterates n times with native', function() {
        let order = [];
        const p = async.timesSeries(5, nativeTask(1, successTask), order);

        return Promise.all([
            p.should.eventually.deep.equal([0, 1, 2, 3, 4]),
            p.then(() => order.should.deep.equal([0, 1, 2, 3, 4]))
        ]);
    });

    it('supports promised arguments', function() {
        let order = [];
        const p = async.timesSeries(
            Promise.resolve(5),
            Promise.resolve((index, order) => new Promise(resolve => setTimeout(_ => {
                order.push(index);
                resolve(index);
            }, (5 - index) * 25))),
            new Promise(resolve => setTimeout(resolve.bind(null, order), 25))
        );

        return Promise.all([
            p.should.eventually.deep.equal([0, 1, 2, 3, 4]),
            p.then(() => order.should.deep.equal([0, 1, 2, 3, 4]))
        ]);
    });

    it('rejects on 3rd delayed iteration', function() {
        let order = [];
        const p = async.timesSeries(5, delayedTask(1, failTask), order);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error, '2'),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([0, 1, 2])),
                6 * 25
            ))
        ]);
    });

    it('rejects on 3rd promise iteration', function() {
        let order = [];
        const p = async.timesSeries(5, promiseTask(1, failTask), order);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error, '2'),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([0, 1, 2])),
                25
            ))
        ]);
    });

    it('rejects on 3rd native iteration', function() {
        let order = [];
        const p = async.timesSeries(5, nativeTask(1, failTask), order);

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error, '2'),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([0, 1, 2])),
                25
            ))
        ]);
    });
});
