'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = liftFn;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function liftFn(fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _tryFn2['default'].apply(undefined, [fn].concat(args));
    };
}

;
module.exports = exports['default'];