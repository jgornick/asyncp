'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = waterfall;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _waterfallError = require('./waterfallError');

var _waterfallError2 = _interopRequireDefault(_waterfallError);

function waterfall(tasks) {
    var results = [];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return tasks.reduce(function (promise, task) {
        return promise.then(function (promiseResults) {
            return _tryFn2['default'].apply(undefined, [task].concat(_toConsumableArray(promiseResults))).then(function (taskResults) {
                return results = Array.isArray(taskResults) ? taskResults : [taskResults];
            });
        });
    }, Promise.resolve(args))['catch'](function (error) {
        var waterfallError = new _waterfallError2['default']();
        waterfallError.message = error.message;
        waterfallError.results = results;
        throw waterfallError;
    });
}

;
module.exports = exports['default'];