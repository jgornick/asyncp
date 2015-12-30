'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parallelLimit;

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parallelLimit(tasks, limit) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return Promise.all(tasks.map((0, _throat2.default)(limit, function (task) {
        return _tryFn2.default.apply(undefined, [task].concat(args));
    })));
};