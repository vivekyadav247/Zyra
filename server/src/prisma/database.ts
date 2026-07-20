import {prisma} from "./prisma.js";
import {logger} from "../app/common/config/logger.js";

export async function connectToDatabase(): Promise<void> {
  try{
    await prisma.$connect();
    logger.info("Connected to the database successfully.");
  } catch (error){
    logger.fatal(error, "Failed to connect to the database:");
    process.exit(1); // Exit the process with a failure code
  }
}

export async function disconnectDatabase(): Promise<void> {
  try{
    await prisma.$disconnect();
    logger.info("Disconnected from the database successfully.");
  }catch (error){
    logger.fatal(error, "Failed to disconnect from the database:");
    process.exit(1); // Exit the process with a failure code
  }
}