import async from '../src/asyncp';

describe('liftFn', function() {
    it('returns a promise', function() {
        const f = async.liftFn((foo) => {
            expect(foo).to.equal(0);
            return foo;
        });
        expect(f).to.be.instanceof(Function);
        const p = f(0);
        expect(p).to.be.instanceof(Promise);
        return Promise.all([
            p.should.eventually.deep.equal(0)
        ]);
    });
});
