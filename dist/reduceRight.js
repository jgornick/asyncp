"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reduceRight;
function reduceRight(collection, result, iterator) {
    return collection.reduceRight(function (promise, item, index, collection) {
        return promise.then(function (result) {
            return iterator(result, item, index, collection);
        });
    }, Promise.resolve(result));
};