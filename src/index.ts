export class ForceConstant<T> {
  private _value: T
  private constructor(value: T) {
    this._value = value
  }
  static from<T>(value: T): ForceConstant<T> {
    return new ForceConstant(value)
  }
  end(): T {
    return this._value
  }
  then<V>(converter: (v: T) => V): ForceConstant<V> {
    return new ForceConstant(converter(this._value))
  }
}

type Condition<T> = [boolean, T]

export class ForceConstantIf<T> {
  private constructor(private _rules: Condition<T>[]) {}

  static if<K>(when: boolean, then: K) {
    return new ForceConstantIf([[when, then]])
  }
  endif(): ForceConstant<T | null> {
    for (const [when, then] of this._rules) {
      if (when) return ForceConstant.from(then)
    }
    return ForceConstant.from(null)
  }
  elif<K>(when: boolean, then: K): ForceConstantIf<T | K> {
    return new ForceConstantIf<T | K>([...this._rules, [when, then]])
  }
  else<K>(then: K): ForceConstantElse<T | K> {
    return new ForceConstantElse<T | K>(this._rules, then)
  }
}

class ForceConstantElse<T> {
  constructor(private _conditions: Condition<T>[], _then: T) {
    this._conditions = [..._conditions, [true, _then]]
  }
  endif(): ForceConstant<T> {
    for (const [when, then] of this._conditions) {
      if (when) return ForceConstant.from(then)
    }
    throw Error('else does not match true')
  }
}
