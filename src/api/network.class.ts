export class ServerError extends Error {
  constructor(
    message = "Server Error",
    public status = 500,
    public code = "SERVER_ERROR"
  ) {
    super(message);
    this.name = "ServerError";
  }
}

export class AuthError extends Error {
  constructor(
    message = "Authentication Error",
    public status = 401,
    public code = "AUTH_ERROR"
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class ServerNotRespondingError extends Error {
  constructor(
    message = "Server is not responding",
    public status = 500,
    public code = "SERVER_NOT_RESPONDING_ERROR"
  ) {
    super(message);
    this.name = "ServerNotRespondingError";
  }
}
