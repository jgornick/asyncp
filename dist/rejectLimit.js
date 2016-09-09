'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rejectLimit;

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASYNCP_UNDEFINED = '__ASYNCP_UNDEFINED__';

function rejectLimit(collection, limit, predicate) {
    if (!limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map((0, _throat2.default)(limit, function (item, index, collection) {
        return (0, _tryFn2.default)(predicate, item, index, collection).then(function (result) {
            return result === true ? ASYNCP_UNDEFINED : item;
        });
    }))).then(function (results) {
        return results.filter(function (item) {
            return item != ASYNCP_UNDEFINED;
        });
    });
};