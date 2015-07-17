'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = until;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function until(condition, task) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return (0, _tryFn2['default'])(condition).then(function (conditionResult) {
        return conditionResult ? Promise.resolve() : _tryFn2['default'].apply(undefined, [task].concat(args)).then(function () {
            return until.apply(undefined, [condition, task].concat(args));
        });
    });
}

;
module.exports = exports['default'];