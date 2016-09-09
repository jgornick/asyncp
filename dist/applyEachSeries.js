'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = applyEachSeries;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyEachSeries(collection) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!args.length) {
        return applyEachSeries.bind(this, collection);
    } else {
        return collection.reduce(function (promise, f) {
            return promise.then(function (results) {
                return _tryFn2.default.apply(undefined, [f].concat(args)).then(function (result) {
                    results.push(result);
                    return results;
                });
            });
        }, Promise.resolve([]));
    }
};