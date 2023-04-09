import { Id } from "./id";
import { v4 as uuid } from "uuid";

export abstract class Uuid extends Id<string> {
  constructor(id: string = null) {
    super(id ?? uuid());
  }
}
