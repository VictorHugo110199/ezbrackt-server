import { Router } from "express";

import { UserController } from "../controllers/User.controller";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";
import { LoginSchema } from "../schemas/Login.schema";
import { bracketsRouter } from "./bracket.routes";
import { competitionRoutes } from "./competition.routes";
import { playerRoutes } from "./player.routes";
import { userRoutes } from "./user.routes";

const userMiddleware = new UserMiddleware();
const dataMiddleware = new DataMiddleware();
const loginSchema = LoginSchema;

export const routes = Router();

routes.use("/users", userRoutes);
routes.use(
  "/login",
  dataMiddleware.ensureData(loginSchema.login),
  userMiddleware.isActive,
  new UserController().login
);
routes.get("/profile", userMiddleware.tokenExists, new UserController().profile);
routes.use("/competitions", competitionRoutes);
routes.use("/players", playerRoutes);
routes.use("/brackets", bracketsRouter);
