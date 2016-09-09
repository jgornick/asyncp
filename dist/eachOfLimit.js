'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eachOfLimit;

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eachOfLimit(collection, limit, iteratee) {
    if (!limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    var keys = Object.keys(collection);
    var values = keys.map(function (key) {
        return collection[key];
    });
    return Promise.all(keys.map((0, _throat2.default)(limit, function (key, index) {
        return (0, _tryFn2.default)(iteratee, values[index], key, collection);
    }))).then(function (results) {
        return results.reduce(function (result, item, index) {
            result[keys[index]] = item;
            return result;
        }, {});
    });
};