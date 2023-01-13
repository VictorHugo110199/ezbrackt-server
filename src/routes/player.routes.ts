import { Router } from "express";

import { PlayerController } from "../controllers/Player.controller";
import { PlayerMiddleware } from "../middlewares/Player.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";

export const playerRoutes = Router();
const playerController = new PlayerController();
const userMiddleware = new UserMiddleware();
const playerMiddleware = new PlayerMiddleware();

playerRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  playerMiddleware.idExist,
  playerMiddleware.ensurePlayerOwnerCompetition,
  playerController.patch
);
