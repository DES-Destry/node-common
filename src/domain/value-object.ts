import { Guard } from "../guard";
import { convertPropsToObject } from "../utils";
import { ArgumentNotProvidedException } from "../exceptions";

export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
  protected readonly _props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this._props = props;

    for (const [key, value] of Object.entries(props)) {
      this[key] = value;
    }
  }

  protected abstract validate(props: ValueObjectProps<T>): void;

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  /**
   *  Check if two Value Objects are equal. Checks structural equality.
   * @param vo ValueObject
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(vo);
  }

  /**
   * Unpack a value object to get its raw properties
   */
  public unpack(): T {
    if (this.isDomainPrimitive(this._props)) {
      return this._props.value;
    }

    const propsCopy = convertPropsToObject(this._props);

    return Object.freeze(propsCopy);
  }

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (
      Guard.isEmpty(props) ||
      (this.isDomainPrimitive(props) && Guard.isEmpty(props.value))
    ) {
      throw new ArgumentNotProvidedException("Property cannot be empty");
    }
  }

  private isDomainPrimitive(
    obj: unknown
  ): obj is DomainPrimitive<T & (Primitives | Date)> {
    return !!Object.prototype.hasOwnProperty.call(obj, "value");
  }
}
