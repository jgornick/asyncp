'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reduceRight;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduceRight(collection, result, iteratee) {
    return collection.reduceRight(function (promise, item, index, collection) {
        return promise.then(function (result) {
            return (0, _tryFn2.default)(iteratee, result, item, index, collection);
        });
    }, Promise.resolve(result));
};