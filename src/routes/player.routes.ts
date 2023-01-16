import { Router } from "express";

import { PlayerController } from "../controllers/Player.controller";
import { cloudinaryFunction, uploadImage } from "../middlewares/photo.middleware";
import { PlayerMiddleware } from "../middlewares/Player.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";

export const playerRoutes = Router();
const playerController = new PlayerController();
const userMiddleware = new UserMiddleware();
const playerMiddleware = new PlayerMiddleware();

playerRoutes.patch(
  "/:id",
  uploadImage,
  cloudinaryFunction,
  userMiddleware.tokenExists,
  playerMiddleware.idExist,
  playerMiddleware.ensurePlayerOwnerCompetition,
  playerController.patch
);
