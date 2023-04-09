/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars*/

import { ValueObject } from "../domain";

function convertToPlainObject(item: any): any {
  if (ValueObject.isValueObject(item)) {
    return item.unpack();
  }

  return item;
}

/**
 * Converts Entity/Value Objects props to a plain object.
 * Useful for testing and debugging.
 * @param props
 */
export function convertPropsToObject(props: any): any {
  const propsCopy = { ...props };

  // eslint-disable-next-line guard-for-in
  for (const prop in propsCopy) {
    if (Array.isArray(propsCopy[prop])) {
      propsCopy[prop] = (propsCopy[prop] as Array<unknown>).map((item) => {
        return convertToPlainObject(item);
      });
    }
    propsCopy[prop] = convertToPlainObject(propsCopy[prop]);
  }

  return propsCopy;
}
