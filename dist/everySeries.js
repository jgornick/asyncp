'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = everySeries;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function everySeries(collection, predicate) {
    return collection.reduce(function (promise) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return promise.then(function () {
            return _tryFn2.default.apply(undefined, [predicate].concat(args)).then(function (result) {
                if (result === false) {
                    return Promise.reject(new _promiseBreak2.default(false));
                }
                return promise;
            });
        });
    }, Promise.resolve()).then(function () {
        return true;
    }).catch(function (error) {
        if (error instanceof _promiseBreak2.default) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
};