"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceConstantIf = exports.ForceConstant = void 0;
class ForceConstant {
    constructor(value) {
        this._value = value;
    }
    static from(value) {
        return new ForceConstant(value);
    }
    end() {
        return this._value;
    }
    then(converter) {
        return new ForceConstant(converter(this._value));
    }
}
exports.ForceConstant = ForceConstant;
class ForceConstantIf {
    constructor(_rules) {
        this._rules = _rules;
    }
    static if(when, then) {
        return new ForceConstantIf([[when, then]]);
    }
    endif() {
        for (const [when, then] of this._rules) {
            if (when)
                return ForceConstant.from(then);
        }
        return ForceConstant.from(null);
    }
    elif(when, then) {
        return new ForceConstantIf([...this._rules, [when, then]]);
    }
    else(then) {
        return new ForceConstantElse(this._rules, then);
    }
}
exports.ForceConstantIf = ForceConstantIf;
class ForceConstantElse {
    constructor(_conditions, _then) {
        this._conditions = _conditions;
        this._conditions = [..._conditions, [true, _then]];
    }
    endif() {
        for (const [when, then] of this._conditions) {
            if (when)
                return ForceConstant.from(then);
        }
        throw Error('else does not match true');
    }
}
