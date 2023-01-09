import { Router } from "express";

import { UserController } from "../Controllers/UserController";
import { UserMiddleware } from "../Middlewares/userMiddleware";
import { userRoutes } from "./userRoutes/user.routes";

const userMiddleware = new UserMiddleware();

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/login", userMiddleware.isActive, new UserController().login);
