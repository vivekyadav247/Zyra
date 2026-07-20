import type { ErrorRequestHandler } from "express";

import { env } from "../config/env.js";
import { logger } from "../config/logger.js";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  let err = ApiError.fromError(error);

  logger.error(
    {
      err,
      statusCode: err.statusCode,
    },
    err.message
  );

  if (!err.isOperational) {
    err = ApiError.internal("Internal Server Error");
  }

  return res.status(err.statusCode).json({
    status: "error",
    message: err.message,
    ...(env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};