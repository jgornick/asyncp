import async from '../src/asyncp';

describe('waterfall', function() {
    it('does mixed tasks (delayed, Promise, native)', function() {
        let order = [];
        const tasks = [
            (arg0, arg1) => new Promise(resolve => setTimeout(_ => {
                order.push(1);
                arg0.should.equal(0, 'assertion failed for waterfall task arguments');
                arg1.should.equal(1, 'assertion failed for waterfall task arguments');
                resolve(arg1)
            }, 25)),
            arg1 => {
                order.push(2);
                arg1.should.equal(1, 'assertion failed for waterfall task arguments');
                return new Promise(resolve => resolve([1 + arg1, 2 + arg1]))
            },
            (arg2, arg3) => {
                order.push(3);
                arg2.should.equal(2, 'assertion failed for waterfall task arguments');
                arg3.should.equal(3, 'assertion failed for waterfall task arguments');
                return 1 + arg2 + arg3;
            }
        ];
        const p = async.waterfall(tasks, 0, 1);
        return Promise.all([
            p.should.eventually.equal(6),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('supports promised arguments', function() {
        let order = [];
        const tasks = [
            (arg0, arg1) => new Promise(resolve => setTimeout(_ => {
                order.push(1);
                arg0.should.equal(0, 'assertion failed for waterfall task arguments');
                arg1.should.equal(1, 'assertion failed for waterfall task arguments');
                resolve(arg1)
            }, 25)),
            arg1 => {
                order.push(2);
                arg1.should.equal(1, 'assertion failed for waterfall task arguments');
                return new Promise(resolve => resolve([1 + arg1, 2 + arg1]))
            },
            (arg2, arg3) => {
                order.push(3);
                arg2.should.equal(2, 'assertion failed for waterfall task arguments');
                arg3.should.equal(3, 'assertion failed for waterfall task arguments');
                return 1 + arg2 + arg3;
            }
        ];
        const p = async.waterfall(
            new Promise(resolve => setTimeout(resolve.bind(null, tasks), 25)),
            Promise.resolve(0),
            Promise.resolve(1)
        );
        return Promise.all([
            p.should.eventually.equal(6),
            p.then(() => order.should.deep.equal([1, 2, 3]))
        ]);
    });

    it('supports empty collections', function() {
        const p = async.waterfall([]);
        return Promise.all([
            p.should.eventually.deep.equal([])
        ]);
    });

    it('rejects with non-array of tasks', function() {
        const p = async.waterfall({});
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error, 'First argument to waterfall must be an array of functions')
        ]);
    });

    it('rejects using delayed Promise.reject', function() {
        let order = [];
        const tasks = [
            order => new Promise(resolve => setTimeout(_ => {
                order.push(1);
                resolve([order]);
            }, 25)),
            order => new Promise((_, reject) => setTimeout(_ => {
                order.push(2);
                reject(new Error('error'));
            }, 25)),
            _ => new Promise(resolve => setTimeout(_ => {
                assert(false, 'task should not be called')
                resolve();
            }, 25)),
        ];
        const p = async.waterfall(tasks, order);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2])),
                7 * 25
            ))
        ]);
    });

    it('rejects using Promise.reject', function() {
        let order = [];
        const tasks = [
            order => new Promise(resolve => {
                order.push(1);
                resolve([order]);
            }),
            order => new Promise((_, reject) => {
                order.push(2);
                reject(new Error('error'));
            }),
            _ => new Promise(resolve => {
                assert(false, 'task should not be called')
                resolve();
            }),
        ];
        const p = async.waterfall(tasks, order);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2])),
                2 * 25
            ))
        ]);
    });

    it('rejects using sync throw', function() {
        let order = [];
        const tasks = [
            order => {
                order.push(1);
                return [order];
            },
            order => {
                order.push(2);
                throw new Error('error');
            },
            _ => {
                assert(false, 'task should not be called');
            },
        ];
        const p = async.waterfall(tasks, order);
        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([1, 2])),
                2 * 25
            ))
        ]);
    });
});
