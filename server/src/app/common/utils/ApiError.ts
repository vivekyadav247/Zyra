class ApiError extends Error {
  constructor(public readonly statusCode: number, message: string, public readonly isOperational:boolean = true) {
    super(message);
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }

  public static badRequest(message: string) : ApiError {
    return new ApiError(400, message);
  }

  public static unauthorized(message: string) : ApiError {
    return new ApiError(401, message);
  }

  public static forbidden(message: string) : ApiError {
    return new ApiError(403, message);
  }

  public static notFound(message: string) : ApiError {
    return new ApiError(404, message);
  }

  public static internal(message: string) : ApiError {
    return new ApiError(500, message);
  }

  public static conflict(message: string) : ApiError {
    return new ApiError(409, message);
  }

  public static unprocessableEntity(message: string) : ApiError {
    return new ApiError(422, message);
  }

  public static custom(statusCode: number, message: string) : ApiError {
    return new ApiError(statusCode, message);
  }

  public static fromError(error: Error) : ApiError {
    if (error instanceof ApiError) {
      return error;
    }
    return new ApiError(500, error.message);
  }
  
}

export { ApiError };