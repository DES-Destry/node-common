import { Id } from "../types";

export abstract class Entity {
  protected abstract _id: Id<any>;
  // private readonly _props: T;

  constructor(props: unknown) {
    this._setId();

    for (const [key, value] of Object.entries(props)) {
      this[key] = value;
    }
  }

  public getId(): Id<any> {
    return this._id;
  }
  protected abstract _setId(): void;
}
