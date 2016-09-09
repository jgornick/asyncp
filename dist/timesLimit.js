'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = timesLimit;

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timesLimit(n, limit, iteratee) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
    }

    return Promise.all(new Array(n).fill().map((0, _throat2.default)(limit, function (item, index) {
        return _tryFn2.default.apply(undefined, [iteratee, index].concat(args));
    })));
};