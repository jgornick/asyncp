'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = someLimit;

var _detectLimit = require('./detectLimit');

var _detectLimit2 = _interopRequireDefault(_detectLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOT_FOUND = '__ASYNCP_NOT_FOUND__';

function someLimit(collection, limit, predicate) {
    return (0, _detectLimit2.default)(collection, limit, predicate, NOT_FOUND).then(function (result) {
        return result !== NOT_FOUND;
    });
};