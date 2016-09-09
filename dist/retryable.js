'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = retryable;

var _retry = require('./retry');

var _retry2 = _interopRequireDefault(_retry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retryable() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return _retry2.default.bind.apply(_retry2.default, [null].concat(args));
};