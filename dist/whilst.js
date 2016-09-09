'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whilst;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function whilst(condition, task) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return _tryFn2.default.apply(undefined, [condition].concat(args)).then(function (conditionResult) {
        return conditionResult ? _tryFn2.default.apply(undefined, [task].concat(args)).then(function (result) {
            return Array.isArray(result) ? whilst.apply(undefined, [condition, task].concat(_toConsumableArray(result))) : whilst(condition, task, result);
        }) : Promise.resolve();
    });
};