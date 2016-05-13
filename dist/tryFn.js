"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = tryFn;
function tryFn(fn) {
    try {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return Promise.resolve(fn.apply(undefined, args));
    } catch (error) {
        return Promise.reject(error);
    }
};