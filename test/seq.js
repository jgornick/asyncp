import async from '../src/asyncp';
import { delayedWithOrder, promiseWithOrder, nativeWithOrder } from './helper';

describe('seq', function() {
    it('supports mixed functions succeeding', function() {
        let order = [];
        const funcs = [
            delayedWithOrder(order, 1, (a, b) => {
                a.should.equal(0);
                b.should.equal(1);
                return a + b;
            }),
            promiseWithOrder(order, 3, (a, b) => {
                a.should.equal(1);
                b.should.equal(3);
                return a + b;
            }),
            nativeWithOrder(order, 2, (a, b) => {
                a.should.equal(4);
                b.should.equal(2);
                return a + b;
            })
        ];
        const add132 = async.seq(...funcs);
        const p = add132(0);
        return Promise.all([
            p.should.eventually.equal(6),
            p.then(() => order.should.deep.equal([1, 3, 2]))
        ]);
    });

    it('supports no functions', function() {
        const funcs = [];
        const id = async.seq(...funcs);
        const p = id(0);
        return Promise.all([
            p.should.eventually.deep.equal([0]),
        ]);
    });

    it('rejects mixed functions', function() {
        let order = [];
        const funcs = [
            nativeWithOrder(order, 1, (a, b) => {
                a.should.equal(0);
                b.should.equal(1);
                return a + b;
            }),
            delayedWithOrder(order, 3, (a, b) => {
                a.should.equal(1);
                b.should.equal(3);
                throw new Error('error');
            }),
            promiseWithOrder(order, 2, (a, b) => {
                assert(false, 'function should not be called');
            })
        ];
        const add132 = async.seq(...funcs);
        const p = add132(0);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 3])),
                7 * 25
            ))
        ]);
    });
});
