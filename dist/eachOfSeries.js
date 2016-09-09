'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eachOfSeries;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eachOfSeries(collection, iteratee) {
    return Object.keys(collection).reduce(function (promise, key) {
        var collectionValue = collection[key];
        return promise.then(function (result) {
            return (0, _tryFn2.default)(iteratee, collectionValue, key, collection).then(function (value) {
                result[key] = value;
                return result;
            });
        });
    }, Promise.resolve({}));
};