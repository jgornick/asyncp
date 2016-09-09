'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = waterfall;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _waterfallError = require('./waterfallError');

var _waterfallError2 = _interopRequireDefault(_waterfallError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function waterfall(tasks) {
    if (!Array.isArray(tasks)) {
        return Promise.reject(new Error('First argument to waterfall must be an array of functions'));
    }

    var results = [];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return tasks.reduce(function (promise, task, index) {
        return promise.then(function (promiseResults) {
            return _tryFn2.default.apply(undefined, [task].concat(_toConsumableArray(promiseResults))).then(function (taskResults) {
                if (index == tasks.length - 1) {
                    return taskResults;
                } else {
                    return results = Array.isArray(taskResults) ? taskResults : [taskResults];
                }
            });
        });
    }, Promise.resolve(args)).catch(function (error) {
        throw new _waterfallError2.default(error.message, results);
    });
};