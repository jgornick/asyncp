'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = concat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function concat(collection, iterator) {
    var results = [];

    return Promise.all(collection.map(function (item, index, collection) {
        return (0, _tryFn2['default'])(iterator, item, index, collection).then(function (result) {
            return results.push.apply(results, _toConsumableArray(result));
        });
    })).then(function () {
        return results;
    });
}

;
module.exports = exports['default'];