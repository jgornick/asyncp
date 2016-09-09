'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eachOf;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eachOf(collection, iteratee) {
    var keys = Object.keys(collection);
    return Promise.all(keys.map(function (key) {
        return (0, _tryFn2.default)(iteratee, collection[key], key, collection);
    })).then(function (results) {
        return results.reduce(function (result, item, index) {
            result[keys[index]] = item;
            return result;
        }, {});
    });
};