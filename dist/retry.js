'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = retry;

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retry(opts) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var task = void 0;

    if (typeof opts == 'function') {
        task = opts;
        opts = {
            times: 5,
            interval: 0
        };
    }

    if (!(0, _isPlainObject2.default)(opts)) {
        opts = {
            times: opts,
            interval: 0
        };
    }

    if (!Number.isInteger(opts.times)) {
        throw new Error('Invalid times option value of "' + opts.times + '"');
    }

    if (opts.interval == null) {
        opts.interval = 0;
    }

    if (typeof opts.interval != 'function') {
        opts.interval = function (interval) {
            return function () {
                return interval;
            };
        }(opts.interval);
    }

    if (task == null) {
        task = args.shift();
    }

    return new Array(opts.times).fill(null).reduce(function (promise, item, index) {
        return promise.then(function (results) {
            return _tryFn2.default.apply(undefined, [task, results].concat(args)).then(function (result) {
                throw new _promiseBreak2.default(result);
            }).catch(function (error) {
                if (error instanceof _promiseBreak2.default) {
                    throw error;
                }

                results.push(error);

                if (index < opts.times - 1) {
                    return new Promise(function (resolve) {
                        return setTimeout(function () {
                            return resolve(results);
                        }, opts.interval(index + 1, results));
                    });
                }

                throw error;
            });
        });
    }, Promise.resolve([])).catch(function (error) {
        if (error instanceof _promiseBreak2.default) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
};