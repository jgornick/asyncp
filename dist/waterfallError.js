'use strict';

module.exports = function WaterfallError(message, results) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.results = results;
};

require('util').inherits(module.exports, Error);