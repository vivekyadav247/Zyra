import type { Response } from "express";

type ResponseStatus = "success" | "error";

export class ApiResponse {
  private static send<T>(
    res: Response,
    statusCode: number,
    status: ResponseStatus,
    data: T | null = null,
    message?: string
  ): Response {
    return res.status(statusCode).json({
      status,
      data,
      message,
    });
  }

  public static success<T>(
    res: Response,
    data: T | null = null,
    message?: string
  ): Response {
    return this.send(res, 200, "success", data, message);
  }

  public static created<T>(
    res: Response,
    data: T | null = null,
    message?: string
  ): Response {
    return this.send(res, 201, "success", data, message);
  }

  public static updated<T>(
    res: Response,
    data: T | null = null,
    message?: string
  ): Response {
    return this.send(res, 200, "success", data, message);
  }

  public static deleted(
    res: Response,
    message = "Resource deleted successfully"
  ): Response {
    return this.send(res, 200, "success", null, message);
  }
}