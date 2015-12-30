"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromiseBreak = (function () {
    _createClass(PromiseBreak, [{
        key: "value",
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            this._value;
        }
    }]);

    function PromiseBreak(value) {
        _classCallCheck(this, PromiseBreak);

        this._value = value;
    }

    return PromiseBreak;
})();

exports.default = PromiseBreak;
;