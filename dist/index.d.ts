export declare class ForceConstant<T> {
    private _value;
    private constructor();
    static from<T>(value: T): ForceConstant<T>;
    end(): T;
    then<V>(converter: (v: T) => V): ForceConstant<V>;
}
declare type Condition<T> = [boolean, T];
export declare class ForceConstantIf<T> {
    private _rules;
    private constructor();
    static if<K>(when: boolean, then: K): ForceConstantIf<K>;
    endif(): ForceConstant<T | null>;
    elif<K>(when: boolean, then: K): ForceConstantIf<T | K>;
    else<K>(then: K): ForceConstantElse<T | K>;
}
declare class ForceConstantElse<T> {
    private _conditions;
    constructor(_conditions: Condition<T>[], _then: T);
    endif(): ForceConstant<T>;
}
export {};
