"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rejectSeries;
function rejectSeries(collection, predicate) {
    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (results) {
            return Promise.resolve(iterator(item, index, collection)).then(function (result) {
                if (result === false) {
                    results.push(item);
                }
                return results;
            });
        });
    }, Promise.resolve([]));
};