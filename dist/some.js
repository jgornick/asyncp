'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = some;

var _detect = require('./detect');

var _detect2 = _interopRequireDefault(_detect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOT_FOUND = '__ASYNCP_NOT_FOUND__';

function some(collection, predicate) {
    return (0, _detect2.default)(collection, predicate, NOT_FOUND).then(function (result) {
        return result !== NOT_FOUND;
    });
};