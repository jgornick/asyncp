'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = doWhilst;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _whilst = require('./whilst');

var _whilst2 = _interopRequireDefault(_whilst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doWhilst(task, condition) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return _tryFn2.default.apply(undefined, [task].concat(args)).then(function () {
        return _whilst2.default.apply(undefined, [condition, task].concat(args));
    });
};