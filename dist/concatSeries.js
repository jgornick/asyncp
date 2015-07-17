'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = concatSeries;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function concatSeries(collection, iterator) {
    return collection.reduce(function (promise, item) {
        return promise.then(function (results) {
            return (0, _tryFn2['default'])(iterator, item).then(function (result) {
                results.push.apply(results, _toConsumableArray(result));
                return results;
            });
        });
    }, Promise.resolve([]));
}

;
module.exports = exports['default'];