'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = delay;

var _promiseTimeoutError = require('./promiseTimeoutError');

var _promiseTimeoutError2 = _interopRequireDefault(_promiseTimeoutError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function delay(time) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'Promise timed out.' : arguments[1];

    return new Promise(function (resolve, reject) {
        return setTimeout(reject.bind(null, new _promiseTimeoutError2.default(message)), time);
    });
};