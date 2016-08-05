export default class PromiseBreak {
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    constructor(value) {
        this._value = value;
    }
};
