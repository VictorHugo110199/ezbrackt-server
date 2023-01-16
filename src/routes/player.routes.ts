import { Router } from "express";

import { PlayerController } from "../controllers/Player.controller";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { PlayerMiddleware } from "../middlewares/Player.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";
import { PlayerSchema } from "../schemas/Player.schema";

export const playerRoutes = Router();
const playerController = new PlayerController();
const userMiddleware = new UserMiddleware();
const playerMiddleware = new PlayerMiddleware();
const dataMiddleware = new DataMiddleware()
const playerSchema = PlayerSchema

playerRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  playerMiddleware.idExist,
  dataMiddleware.ensureData(playerSchema.update),
  playerMiddleware.ensurePlayerOwnerCompetition,
  playerController.patch
);
