import express from "express";
import type {Express} from "express" ;
import cors from "cors";
import cookieParser from "cookie-parser";

export function createApplication(): Express {
  const app = express() ;
  app.use(express.json()) ;
  app.use(express.urlencoded({ extended: true })) ;
  app.use(cors()) ;
  app.use(cookieParser()) ;

  app.get("/", (req, res) => {
    res.send("hello Zyra") ;
  })

  return app ;

}