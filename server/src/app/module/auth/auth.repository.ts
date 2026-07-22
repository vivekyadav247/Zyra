import {
  OAuthProvider,
  Prisma,
} from "@prisma/client";

import { PrismaProvider } from "../../common/providers/prisma.provider.js";

export class AuthRepository {
  private readonly prisma = PrismaProvider.getClient();

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findOAuthAccount(
    provider: OAuthProvider,
    providerAccountId: string
  ) {
    return this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async createOAuthAccount(
    data: Prisma.OAuthAccountCreateInput
  ) {
    return this.prisma.oAuthAccount.create({
      data,
    });
  }

  async createRefreshToken(
    data: Prisma.RefreshTokenCreateInput
  ) {
    return this.prisma.refreshToken.create({
      data,
    });
  }

  async findRefreshTokenByHash(tokenHash: string) {
    return this.prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  async deleteRefreshTokenByHash(tokenHash: string) {
    return this.prisma.refreshToken.delete({
      where: {
        tokenHash,
      },
    });
  }

  async updateLastLogin(userId: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }
}