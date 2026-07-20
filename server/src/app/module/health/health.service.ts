import { env } from "../../common/config/env.js";

export class HealthService {
  async checkHealth() {
    return {
      status: "ok",
      environment: env.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}

export const healthService = new HealthService();