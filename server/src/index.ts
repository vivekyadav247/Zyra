import {createServer} from "node:http"
import { createApplication } from "./app/app.js";
import { env } from "./app/common/config/env.js";
import { connectToDatabase, disconnectDatabase } from "./prisma/database.js";
import {logger} from "./app/common/config/logger.js";

let server : ReturnType<typeof createServer> ;

async function main(){
  try{
    await connectToDatabase();
    server = createServer(createApplication()) ;
    const PORT:number = env.PORT ;

    server.listen(PORT,()=>{
      logger.info(`Server is running on port ${PORT}`)
    })
  } catch(err){
    logger.fatal(err, "Failed to start the server:");
  }
}

main() ;

process.on("SIGINT", async () => {
  logger.info("Shutting down...");
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Shutting down...");
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGINT", async () => {
  logger.info("SIGINT received");

  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
});