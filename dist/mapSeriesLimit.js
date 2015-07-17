'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = mapSeriesLimit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eachLimit = require('./eachLimit');

var _eachLimit2 = _interopRequireDefault(_eachLimit);

function mapSeriesLimit(collection, iterator) {
    return (0, _eachLimit2['default'])(collection, iterator);
}

;
module.exports = exports['default'];