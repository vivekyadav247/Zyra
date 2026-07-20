import { Router } from "express";

import { getHealth } from "./health.controller.js";
import {  asyncHandler } from "../../common/middleware/async.middleware.js";

const router = Router();

router.get("/", asyncHandler(getHealth));

export default router;