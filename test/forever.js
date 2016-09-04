import async from '../src/async';

describe('forever', function() {
    it('supports delayed task with rejection', function() {
        let order = [];
        const p = async.forever(
            count => new Promise((resolve, reject) => setTimeout(_ => {
                order.push(`task${count}`);
                if (count == 25) {
                    reject(new Error(count));
                } else {
                    resolve(++count);
                }
            }, 25)),

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal(
                new Array(26).fill(null).map((_, index) => `task${index}`)
            ))
        ]);
    });

    it('supports promise task with rejection', function() {
        let order = [];
        const p = async.forever(
            count => new Promise((resolve, reject) => {
                order.push(`task${count}`);
                if (count == 25) {
                    reject(new Error(count));
                } else {
                    resolve(++count);
                }
            }),

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal(
                new Array(26).fill(null).map((_, index) => `task${index}`)
            ))
        ]);
    });

    it('supports native task with throw', function() {
        let order = [];
        const p = async.forever(
            count => {
                order.push(`task${count}`);
                if (count == 25) {
                    throw new Error(count);
                } else {
                    return ++count;
                }
            },

            0
        );

        return Promise.all([
            p.should.eventually.be.rejectedWith(Error),
            p.catch(() => order.should.deep.equal(
                new Array(26).fill(null).map((_, index) => `task${index}`)
            ))
        ]);
    });

});
