'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = seq;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _waterfall = require('./waterfall');

var _waterfall2 = _interopRequireDefault(_waterfall);

function seq() {
    for (var _len = arguments.length, tasks = Array(_len), _key = 0; _key < _len; _key++) {
        tasks[_key] = arguments[_key];
    }

    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _waterfall2['default'].apply(undefined, [tasks].concat(args));
    };
}

;
module.exports = exports['default'];