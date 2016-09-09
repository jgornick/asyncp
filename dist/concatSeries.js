'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = concatSeries;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function concatSeries(collection, iteratee) {
    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (results) {
            return (0, _tryFn2.default)(iteratee, item, index, collection).then(function (result) {
                return results.concat(result);
            });
        });
    }, Promise.resolve([]));
};