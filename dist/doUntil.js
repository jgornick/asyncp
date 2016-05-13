'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = doUntil;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

var _until = require('./until');

var _until2 = _interopRequireDefault(_until);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doUntil(task, condition) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return _tryFn2.default.apply(undefined, [task].concat(args)).then(function () {
        return (0, _until2.default)(condition, task);
    });
};