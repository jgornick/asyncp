'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = filter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

function filter(collection, predicate) {
    return (0, _each2['default'])(collection, predicate).then(function (results) {
        return collection.filter(function (item, index) {
            return results[index];
        });
    });
}

;
module.exports = exports['default'];