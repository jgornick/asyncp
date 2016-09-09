'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rejectSeries;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rejectSeries(collection, predicate) {
    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (results) {
            return (0, _tryFn2.default)(predicate, item, index, collection).then(function (result) {
                if (result === false) {
                    results.push(item);
                }
                return results;
            });
        });
    }, Promise.resolve([]));
};