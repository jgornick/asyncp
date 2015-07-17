"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = mapSeries;

function mapSeries(collection, iterator) {
    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (results) {
            return Promise.resolve(iterator(item, index, collection)).then(function (result) {
                results.push(result);
                return results;
            });
        });
    }, Promise.resolve([]));
}

;
module.exports = exports["default"];