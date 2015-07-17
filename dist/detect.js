'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = detect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function detect(collection, predicate) {
    var notFound = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

    return Promise.all(collection.map(function (item, index, collection) {
        return (0, _tryFn2['default'])(predicate, item, index, collection).then(function (result) {
            if (result === true) {
                return Promise.reject(new _promiseBreak2['default'](item));
            }
            return result;
        });
    })).then(function () {
        return notFound;
    })['catch'](function (error) {
        if (error instanceof _promiseBreak2['default']) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
}

;
module.exports = exports['default'];