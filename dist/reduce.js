"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reduce;
function reduce(collection, result, iterator) {
    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (result) {
            return iterator(result, item, index, collection);
        });
    }, Promise.resolve(result));
};