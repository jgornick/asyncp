'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = applyEach;

var _tryFn = require('./tryFn');

var _tryFn2 = _interopRequireDefault(_tryFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyEach(collection) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!args.length) {
        return applyEach.bind(this, collection);
    } else {
        return Promise.all(collection.map(function (f) {
            return _tryFn2.default.apply(undefined, [f].concat(args));
        }));
    }
};