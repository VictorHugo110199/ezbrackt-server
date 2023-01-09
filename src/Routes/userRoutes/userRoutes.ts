import { Router } from "express";

import { UserController } from "../../Controllers/UserController";

export const userRoutes = Router();

userRoutes.post("/", new UserController().create);
