import type { Request, Response } from "express";

import { AuthService } from "./auth.service.js";

import { setAuthCookies } from "../../common/utils/cookie.js";

export class AuthController {
  private readonly authService = new AuthService();

  googleLogin = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { idToken } = req.body;

    const { user, accessToken, refreshToken } =
      await this.authService.googleLogin(idToken);

    setAuthCookies(
      res,
      accessToken,
      refreshToken
    );

    res.status(200).json({
      success: true,
      message: "Google login successful.",
      data: {
        user,
      },
    });
  };
}