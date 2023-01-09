import { Router } from "express";

import { UserController } from "../../Controllers/UserController";
import { UserMiddleware } from "../../Middlewares/userMiddleware";

const userMiddleware = new UserMiddleware();
const userController = new UserController();

export const userRoutes = Router();

userRoutes.post("/", userMiddleware.emailExists, userController.create);
userRoutes.get("");
userRoutes.get("/:id");
userRoutes.patch("/:id");
userRoutes.delete("/:id");
