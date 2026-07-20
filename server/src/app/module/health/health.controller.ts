import type { RequestHandler } from "express";

import { ApiResponse } from "../../common/utils/ApiResponse.js";
import { healthService } from "./health.service.js";

export const getHealth: RequestHandler = async (_req, res) => {
  const data = await healthService.checkHealth();

  return ApiResponse.success(res, data);
};