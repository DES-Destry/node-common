export enum ErrorKind {
  Default,

  IncorrectUserInput,
  UserAuthenticationRequired,
  UserAuthorizationRequired,
  EntityNotFound,
  EntitiesConflicting,

  ExternalApiError,
  MethodNotImplemented,
}
