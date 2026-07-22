import { PrismaClient } from "@prisma/client";

export class PrismaProvider {
  private static instance: PrismaClient;

  public static getClient(): PrismaClient {
    if (!PrismaProvider.instance) {
      PrismaProvider.instance = new PrismaClient();
    }

    return PrismaProvider.instance;
  }

  public static async connect(): Promise<void> {
    await PrismaProvider.getClient().$connect();
  }

  public static async disconnect(): Promise<void> {
    await PrismaProvider.getClient().$disconnect();
  }
}