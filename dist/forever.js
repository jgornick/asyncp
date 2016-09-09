'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = forever;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function forever(task) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return _tryFn2.default.apply(undefined, [task].concat(args)).then(function (result) {
        return Array.isArray(result) ? forever.apply(undefined, [task].concat(_toConsumableArray(result))) : forever(task, result);
    });
};