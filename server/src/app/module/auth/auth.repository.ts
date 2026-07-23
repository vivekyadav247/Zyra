import type {
  OAuthAccount,
  OAuthProvider,
  Prisma,
  Profile,
  RefreshToken,
  User,
} from "@prisma/client";

import { PrismaProvider } from "../../common/providers/prisma.provider.js";

export class AuthRepository {
  private readonly prisma = PrismaProvider.getClient();

  async findUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOAuthAccount(
    provider: OAuthProvider,
    providerAccountId: string,
  ): Promise<OAuthAccount | null> {
    return this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createOAuthAccount(
    data: Prisma.OAuthAccountCreateInput,
  ): Promise<OAuthAccount> {
    return this.prisma.oAuthAccount.create({
      data,
    });
  }

  async createRefreshToken(
    data: Prisma.RefreshTokenCreateInput,
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({
      data,
    });
  }

  async findRefreshTokenByHash(
    tokenHash: string,
  ): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  async deleteRefreshTokenByHash(tokenHash: string): Promise<RefreshToken> {
    return this.prisma.refreshToken.delete({
      where: {
        tokenHash,
      },
    });
  }

  async deleteAllRefreshTokensByUserId(
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  async updateLastLogin(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }

  async findProfileByUserId(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }
}
