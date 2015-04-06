export default class WaterfallError extends Error {
    get results() {
        return this._results;
    }

    set results(results) {
        if (this._results == null) {
            this._results = results;
        }

        return this;
    }

    constructor(...args) {
        super(...args);

        this.name = 'WaterfallError';
        this._results = null;
    }
};