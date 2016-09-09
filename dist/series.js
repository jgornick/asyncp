'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = series;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function series(tasks) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!Array.isArray(tasks)) {
        return Promise.reject(new Error('First argument to series must be an array of functions'));
    }

    return tasks.reduce(function (promise, task) {
        return promise.then(function (results) {
            return _tryFn2.default.apply(undefined, [task].concat(args)).then(function (result) {
                results.push(result);
                return results;
            });
        });
    }, Promise.resolve([]));
};