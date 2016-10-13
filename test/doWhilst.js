import async from '../src/asyncp';

describe('doWhilst', function() {
    it('supports delayed task and delayed condition', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise(resolve => setTimeout(_ => {
                order.push(`task${count}`);
                count++;
                resolve(count);
            }, 25)),

            count => new Promise(resolve => setTimeout(_ => {
                order.push(`condition${count}`);
                resolve(count < 5);
            }, 25)),

            0
        );

        return Promise.all([
            p.should.eventually.equal(undefined),
            p.then(() => order.should.deep.equal([
                'task0',
                'condition1',
                'task1',
                'condition2',
                'task2',
                'condition3',
                'task3',
                'condition4',
                'task4',
                'condition5'
            ]))
        ]);
    });

    it('supports delayed task and promise condition', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise(resolve => setTimeout(_ => {
                order.push(`task${count}`);
                count++;
                resolve(count);
            }, 25)),

            count => new Promise(resolve => {
                order.push(`condition${count}`);
                resolve(count < 5);
            }),

            0
        );

        return Promise.all([
            p.should.eventually.equal(undefined),
            p.then(() => order.should.deep.equal([
                'task0',
                'condition1',
                'task1',
                'condition2',
                'task2',
                'condition3',
                'task3',
                'condition4',
                'task4',
                'condition5'
            ]))
        ]);
    });

    it('supports promise task and promise condition', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise(resolve => {
                order.push(`task${count}`);
                count++;
                resolve(count);
            }),

            count => new Promise(resolve => {
                order.push(`condition${count}`);
                resolve(count < 5);
            }),

            0
        );

        return Promise.all([
            p.should.eventually.equal(undefined),
            p.then(() => order.should.deep.equal([
                'task0',
                'condition1',
                'task1',
                'condition2',
                'task2',
                'condition3',
                'task3',
                'condition4',
                'task4',
                'condition5'
            ]))
        ]);
    });

    it('supports promised arguments', function() {
        let order = [];
        const p = async.doWhilst(
            new Promise(resolve => setTimeout(
                resolve.bind(
                    null,
                    count => new Promise(resolve => setTimeout(_ => {
                        order.push(`task${count}`);
                        count++;
                        resolve(count);
                    }, 25))
                ),
                25
            )),

            new Promise(resolve => setTimeout(
                resolve.bind(
                    null,
                    count => new Promise(resolve => setTimeout(_ => {
                        order.push(`condition${count}`);
                        resolve(count < 5);
                    }, 25))
                ),
                25
            )),


            Promise.resolve(0)
        );

        return Promise.all([
            p.should.eventually.equal(undefined),
            p.then(() => order.should.deep.equal([
                'task0',
                'condition1',
                'task1',
                'condition2',
                'task2',
                'condition3',
                'task3',
                'condition4',
                'task4',
                'condition5'
            ]))
        ]);
    });


    it('rejects in delayed task', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise((resolve, reject) => setTimeout(_ => {
                order.push(`task${count}`);
                count++;
                if (count == 3) {
                    reject(new Error('error'));
                } else {
                    resolve(count);
                }
            }, 25)),

            count => new Promise(resolve => setTimeout(_ => {
                order.push(`condition${count}`);
                resolve(count < 5);
            }, 25)),

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([
                    'task0',
                    'condition1',
                    'task1',
                    'condition2',
                    'task2'
                ])),
                11 * 25
            ))
        ]);
    });

    it('rejects in promise task', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise((resolve, reject) => {
                order.push(`task${count}`);
                count++;
                if (count == 3) {
                    reject(new Error('error'));
                } else {
                    resolve(count);
                }
            }),

            count => new Promise(resolve => setTimeout(_ => {
                order.push(`condition${count}`);
                resolve(count < 5);
            }, 25)),

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([
                    'task0',
                    'condition1',
                    'task1',
                    'condition2',
                    'task2'
                ])),
                11 * 25
            ))
        ]);
    });

    it('rejects in native task', function() {
        let order = [];
        const p = async.doWhilst(
            count => {
                order.push(`task${count}`);
                count++;
                if (count == 3) {
                    throw new Error('error');
                } else {
                    return count;
                }
            },

            count => {
                order.push(`condition${count}`);
                return count < 5;
            },

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([
                    'task0',
                    'condition1',
                    'task1',
                    'condition2',
                    'task2'
                ])),
                25
            ))
        ]);
    });

    it('rejects in delayed condition', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise(resolve => setTimeout(_ => {
                order.push(`task${count}`);
                count++;
                resolve(count);
            }, 25)),

            count => new Promise((resolve, reject) => setTimeout(_ => {
                order.push(`condition${count}`);
                if (count == 3) {
                    reject(new Error('error'));
                } else {
                    resolve(count < 5);
                }
            }, 25)),

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([
                    'task0',
                    'condition1',
                    'task1',
                    'condition2',
                    'task2',
                    'condition3'
                ])),
                11 * 25
            ))
        ]);
    });

    it('rejects in promise condition', function() {
        let order = [];
        const p = async.doWhilst(
            count => new Promise(resolve => {
                order.push(`task${count}`);
                count++;
                resolve(count);
            }),

            count => new Promise((resolve, reject) => {
                order.push(`condition${count}`);
                if (count == 3) {
                    reject(new Error('error'));
                } else {
                    resolve(count < 5);
                }
            }),

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([
                    'task0',
                    'condition1',
                    'task1',
                    'condition2',
                    'task2',
                    'condition3'
                ])),
                11 * 25
            ))
        ]);
    });

    it('rejects in native condition', function() {
        let order = [];
        const p = async.doWhilst(
            count => {
                order.push(`task${count}`);
                count++;
                return count;
            },

            count => {
                order.push(`condition${count}`);
                if (count == 3) {
                    throw new Error('error');
                } else {
                    return count < 5;
                }
            },

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            new Promise(resolve => setTimeout(
                () => resolve(order.should.deep.equal([
                    'task0',
                    'condition1',
                    'task1',
                    'condition2',
                    'task2',
                    'condition3'
                ])),
                11 * 25
            ))
        ]);
    });

    it('has doDuring alias', function(done) {
        assert.strictEqual(async.doWhilst, async.doDuring);
        done();
    });
});
