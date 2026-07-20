import express from "express";
import type {Express} from "express" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./common/middleware/error.middleware.js";
import { notFoundHandler } from "./common/middleware/notFound.middleare.js";

export function createApplication(): Express {
  const app = express() ;
  app.use(express.json()) ;
  app.use(express.urlencoded({ extended: true })) ;
  app.use(cors()) ;
  app.use(cookieParser()) ;

  app.get("/", (req, res) => {
    res.send("hello Zyra") ;
  })

  app.use(notFoundHandler) ; // Global 404 handler for unmatched routes

  app.use(errorHandler) ; // Global error handler for all errors

  return app ;

}