import crypto from "node:crypto";

import type { User } from "@prisma/client";

import { ApiError } from "../../common/utils/ApiError.js";
import { GoogleProvider } from "../../common/providers/google.provider.js";
import { JwtProvider } from "../../common/providers/jwt.provider.js";

import { AuthRepository } from "./auth.repository.js";

export class AuthService {
  private readonly authRepository = new AuthRepository();

  async googleLogin(idToken: string) {
    const googleUser =
      await GoogleProvider.verifyIdToken(idToken);

    let user: User | null = null;

    const oauthAccount =
      await this.authRepository.findOAuthAccount(
        "GOOGLE",
        googleUser.googleId
      );

    if (oauthAccount) {
      user = await this.authRepository.findUserById(
        oauthAccount.userId
      );

      if (!user) {
        throw ApiError.notFound("User not found.");
      }
    } else {
      user = await this.authRepository.findUserByEmail(
        googleUser.email
      );

      if (!user) {
        user = await this.authRepository.createUser({
          email: googleUser.email,
          emailVerified: googleUser.emailVerified,
        });

        // TODO:
        // Create Profile
      }

      await this.authRepository.createOAuthAccount({
        provider: "GOOGLE",
        providerAccountId: googleUser.googleId,
        accessToken: null,
        refreshToken: null,
        user: {
          connect: {
            id: user.id,
          },
        },
      });
    }

    const accessToken =
      JwtProvider.generateAccessToken({
        userId: user.id,
        email: user.email,
      });

    const refreshToken =
      JwtProvider.generateRefreshToken({
        userId: user.id,
        email: user.email,
      });

    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await this.authRepository.createRefreshToken({
      tokenHash,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    await this.authRepository.updateLastLogin(user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}