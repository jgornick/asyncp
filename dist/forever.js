'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = forever;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function forever(task) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return _tryFn2.default.apply(undefined, [task].concat(args)).then(function () {
        for (var _len2 = arguments.length, results = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            results[_key2] = arguments[_key2];
        }

        return forever.apply(undefined, [task].concat(results));
    });
};