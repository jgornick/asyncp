'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = sortBy;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortBy(collection, iteratee, comparator) {
    if (comparator == null) {
        comparator = function comparator(a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        };
    }

    return Promise.all(collection.map(function (item, index, collection) {
        return (0, _tryFn2.default)(iteratee, item, index, collection).then(function (result) {
            return [result, item];
        });
    })).then(function (results) {
        return results.sort(function (_ref, _ref2) {
            var _ref4 = _slicedToArray(_ref, 1);

            var a = _ref4[0];

            var _ref3 = _slicedToArray(_ref2, 1);

            var b = _ref3[0];
            return comparator(a, b);
        }).map(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2);

            var _ = _ref6[0];
            var item = _ref6[1];
            return item;
        });
    });
};