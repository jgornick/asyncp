import async from '../src/async';

describe('tryFn', function() {
    it('returns a promise', function() {
        const p = async.tryFn(
            (foo) => {
                expect(foo).to.equal(0);
                return foo;
            },
            0
        );
        expect(p).to.be.instanceof(Promise);
        return Promise.all([
            p.should.eventually.deep.equal(0)
        ]);
    });
});
