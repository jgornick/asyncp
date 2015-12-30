'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortBy;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortBy(collection, iterator, sorter) {
    if (sorter == null) {
        sorter = function (a, b) {
            return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
        };
    }

    return Promise.all(collection.map(function (item, index, collection) {
        return (0, _tryFn2.default)(iterator, item, index, collection).then(function (result) {
            return [result, item];
        });
    })).then(function (collection) {
        return collection.sort(sorter).map(function (item) {
            return item[1];
        });
    });
};