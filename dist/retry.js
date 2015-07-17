'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = retry;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function retry(times, task) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    if (times === undefined) times = 5;

    return new Array(times).fill(null).reduce(function (promise, item, index) {
        return promise.then(function () {
            return _tryFn2['default'].apply(undefined, [task].concat(args)).then(function (result) {
                throw new _promiseBreak2['default'](result);
            })['catch'](function (error) {
                if (index < times - 1) {
                    return Promise.resolve();
                }

                throw error;
            });
        });
    }, Promise.resolve())['catch'](function (error) {
        if (error instanceof _promiseBreak2['default']) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
}

;
module.exports = exports['default'];