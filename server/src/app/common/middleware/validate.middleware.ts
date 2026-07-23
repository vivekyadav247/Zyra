import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/ApiError.js";

type DtoClass = {
  validate(data: unknown): unknown;
};

export const validate =
  (Dto: DtoClass) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = Dto.validate(req.body);

      next();
    } catch (error) {
      if (error instanceof Error) {
        return next(ApiError.badRequest(error.message));
      }

      next(error);
    }
  };
