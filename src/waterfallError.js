export default class WaterfallError extends Error {
    constructor(message, results) {
        super(message);
        this.results = results;
    }
};
