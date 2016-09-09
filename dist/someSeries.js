'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = someSeries;

var _detectSeries = require('./detectSeries');

var _detectSeries2 = _interopRequireDefault(_detectSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOT_FOUND = '__ASYNCP_NOT_FOUND__';

function someSeries(collection, predicate) {
    return (0, _detectSeries2.default)(collection, predicate, NOT_FOUND).then(function (result) {
        return result !== NOT_FOUND;
    });
};