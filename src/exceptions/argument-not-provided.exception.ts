import { DomainException } from "./common";
import { ErrorKind } from "./common";
import { DomainErrorCode } from "./common";

export class ArgumentNotProvidedException extends DomainException {
  constructor(message: string = null, metadata?: unknown) {
    super(message, metadata);
    this.message = this.message ?? this.defaultMessage;
  }

  readonly code = DomainErrorCode.ArgumentNotProvided;
  readonly kind = ErrorKind.Default;
  readonly defaultMessage = "Argument not provided!";
}
