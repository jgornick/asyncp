'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = detectLimit;

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function detectLimit(collection, limit, predicate) {
    var notFound = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

    if (!limit > 0) {
        return Promise.reject(new Error('Limit must be a number greater than 0.'));
    }

    return Promise.all(collection.map((0, _throat2.default)(limit, function (item, index, collection) {
        return (0, _tryFn2.default)(predicate, item, index, collection).then(function (result) {
            if (result === true) {
                return Promise.reject(new _promiseBreak2.default(item));
            }
            return result;
        });
    }))).then(function () {
        return notFound;
    }).catch(function (error) {
        if (error instanceof _promiseBreak2.default) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
};