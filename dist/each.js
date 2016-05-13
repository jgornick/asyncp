"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = each;
function each(collection, iterator) {
    return Promise.all(collection.map(iterator));
};