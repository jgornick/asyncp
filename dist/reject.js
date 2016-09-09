'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reject;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASYNCP_UNDEFINED = '__ASYNCP_UNDEFINED__';

function reject(collection, predicate) {
    return Promise.all(collection.map(function (item, index, collection) {
        return (0, _tryFn2.default)(predicate, item, index, collection).then(function (result) {
            return result === true ? ASYNCP_UNDEFINED : item;
        });
    })).then(function (results) {
        return results.filter(function (item) {
            return item != ASYNCP_UNDEFINED;
        });
    });
};