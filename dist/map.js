'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = map;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

function map(collection, iterator) {
    return (0, _each2['default'])(collection, iterator);
}

;
module.exports = exports['default'];