'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transform;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(collection, accumulator, iteratee) {
    if (arguments.length === 2) {
        iteratee = accumulator;
        accumulator = Array.isArray(collection) ? [] : {};
    }

    return collection.reduce(function (promise) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return promise.then(function (_) {
            return _tryFn2.default.apply(undefined, [iteratee, accumulator].concat(args));
        });
    }, Promise.resolve()).then(function (_) {
        return accumulator;
    });
};