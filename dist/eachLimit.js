'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eachLimit;

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eachLimit(collection, limit, iteratee) {
    if (!limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map((0, _throat2.default)(limit, iteratee)));
};