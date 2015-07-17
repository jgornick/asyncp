'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = times;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function times(n, callback) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return Promise.all(new Array(n).fill(null).map(function (item, index) {
        return _tryFn2['default'].apply(undefined, [callback, index].concat(args));
    }));
}

;
module.exports = exports['default'];