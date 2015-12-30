'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = detectSeries;

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function detectSeries(collection, predicate) {
    var notFound = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (results) {
            return Promise.resolve(iterator(item, index, collection)).then(function (result) {
                if (result === true) {
                    return Promise.reject(new _promiseBreak2.default(item));
                }
                return results;
            });
        });
    }, Promise.resolve()).then(function () {
        return notFound;
    }).catch(function (error) {
        if (error instanceof _promiseBreak2.default) {
            return Promise.resolve(error.value);
        }
        throw error;
    });
};