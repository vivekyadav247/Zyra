import { Router } from "express";

import { AuthController } from "./auth.controller.js";

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  "/google",
  authController.googleLogin
);

export default authRouter;