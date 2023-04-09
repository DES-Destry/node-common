import { ErrorKind } from "./error-kind";

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class DomainException
 * @extends {Error}
 */
export abstract class DomainException extends Error {
  private readonly _defaultScope = "DOMAIN.";
  /**
   * @param {string} message
   * @param {Object} [metadata={}]
   * **BE CAREFUL** not to include sensitive info in 'metadata'
   * to prevent leaks since all exception's data will end up
   * in application's log files. Only include non-sensitive
   * info that may help with debugging.
   */
  protected constructor(message: string = null, readonly metadata?: unknown) {
    super(message);
  }

  abstract code: string;
  abstract kind: ErrorKind;
  abstract defaultMessage?: string;

  public applyScope = (scope: string) => {
    if (this.code.startsWith(this._defaultScope)) {
      this.code.replace(this._defaultScope, `${scope}.`);
      return;
    }

    this.code = `${scope}.${this.code}`;
  };
}
