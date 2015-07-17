'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = parallel;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function parallel(tasks) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return Promise.all(tasks.map(function (task) {
        return _tryFn2['default'].apply(undefined, [task].concat(args));
    }));
}

;
module.exports = exports['default'];