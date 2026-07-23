import type { NextFunction, Request, Response } from "express";

import { JwtProvider } from "../providers/jwt.provider.js";
import { ApiError } from "../utils/ApiError.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("Access token is missing."));
  }

  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    return next(ApiError.unauthorized("Access token is missing."));
  }

  const payload = JwtProvider.verifyAccessToken(accessToken);

  req.user = payload;

  next();
};
