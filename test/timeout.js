import async from '../src/asyncp';
import { delayedTask, promiseTask, nativeTask } from './helper';

describe('timeout', function() {
    it('resolves before timeout', function() {
        const p = async.timeout(
            (index) => new Promise(resolve => setTimeout(_ => {
                resolve(index);
            }, 25)),
            50,
            0
        );

        return Promise.all([
            p.should.eventually.equal(0)
        ]);
    });

    it('resolves before timeout with promise', function() {
        const p = async.timeout(
            new Promise(resolve => setTimeout(_ => {
                resolve(0);
            }, 25)),
            50
        );

        return Promise.all([
            p.should.eventually.equal(0)
        ]);
    });


    it('rejects before timeout', function() {
        const p = async.timeout(
            (index) => new Promise((_, reject) => setTimeout(_ => {
                reject(new Error(index));
            }, 25)),
            50,
            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error, '0')
        ]);
    });

    it('rejects before timeout with promise', function() {
        const p = async.timeout(
            new Promise((_, reject) => setTimeout(_ => {
                reject(new Error(0));
            }, 25)),
            50
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error, '0')
        ]);
    });

    it('rejects after timeout', function() {
        const p = async.timeout(
            (index) => new Promise(resolve => setTimeout(_ => {}, 100)),
            50,
            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(async.PromiseTimeoutError)
        ]);
    });
});
