import { Router } from "express";

import { UserController } from "../../Controllers/UserController";
import { UserMiddleware } from "../../Middlewares/userMiddleware";

export const userRoutes = Router();

userRoutes.post("/", new UserMiddleware().emailExists, new UserController().create);
