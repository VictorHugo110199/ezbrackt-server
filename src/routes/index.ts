import { Router } from "express";

import { UserController } from "../controllers/User.controller";
import { UserMiddleware } from "../middlewares/User.middleware";
import { competitionRoutes } from "./competition.routes";
import { playerRoutes } from "./player.routes";
import { userRoutes } from "./user.routes";

const userMiddleware = new UserMiddleware();

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/login", userMiddleware.isActive, new UserController().login);
routes.get("/profile", userMiddleware.tokenExists, new UserController().profile);
routes.use("/competitions", competitionRoutes);
routes.use("/players", playerRoutes);
