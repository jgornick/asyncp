'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = eachSeries;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _promiseBreak = require('./promiseBreak');

var _promiseBreak2 = _interopRequireDefault(_promiseBreak);

function eachSeries(collection, iterator) {
    var results = [];

    return collection.reduce(function (promise, item, index, collection) {
        return promise.then(function (results) {
            return Promise.resolve(iterator(item, index, collection)).then(function (result) {
                if (result === false) {
                    return Promise.reject(new _promiseBreak2['default'](item));
                }
                results.push(result);
                return results;
            });
        });
    }, Promise.resolve(results))['catch'](function (error) {
        if (error instanceof _promiseBreak2['default']) {
            return Promise.resolve(results);
        }
        throw error;
    });
}

;
module.exports = exports['default'];