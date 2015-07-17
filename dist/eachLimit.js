'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = eachLimit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _throat = require('throat');

var _throat2 = _interopRequireDefault(_throat);

function eachLimit(collection, limit, iterator) {
    return Promise.all(collection.map((0, _throat2['default'])(limit, iterator)));
}

;
module.exports = exports['default'];