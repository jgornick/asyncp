'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = timeout;

var _delay = require('./delay');

var _delay2 = _interopRequireDefault(_delay);

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timeout(promise, time) {
    if (typeof promise == 'function') {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        promise = _tryFn2.default.apply(undefined, [promise].concat(args));
    }

    return Promise.race([promise, (0, _delay2.default)(time)]);
};