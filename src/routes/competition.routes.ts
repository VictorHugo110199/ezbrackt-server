import { Router } from "express";

import { CompetitionController } from "../controllers/Competition.controller";
import { PlayerController } from "../controllers/Player.controller";
import { CompetitionMiddleware } from "../middlewares/Competition.middleware";
import { cloudinaryFunction, uploadImage } from "../middlewares/photo.middleware";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";
import { CompetitionSchema } from "../schemas/Competition.schema";
import { PlayerSchema } from "../schemas/Player.schema";

const userMiddleware = new UserMiddleware();
const competitionController = new CompetitionController();
const competitionMiddleware = new CompetitionMiddleware();
const playerController = new PlayerController();
const dataMiddleware = new DataMiddleware();
const playerSchema = PlayerSchema;
const competitionSchema = CompetitionSchema

export const competitionRoutes = Router();

competitionRoutes.post("/", userMiddleware.tokenExists, dataMiddleware.ensureData(competitionSchema.create),competitionController.create);

competitionRoutes.get("/", userMiddleware.tokenExists, competitionController.getCompetitions);

competitionRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  dataMiddleware.ensureData(competitionSchema.create),
  competitionMiddleware.idValid,
  competitionController.update
);

competitionRoutes.delete(
  "/:id",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  competitionMiddleware.idValid,
  competitionController.delete
);

competitionRoutes.post(
  "/:id/players",
  uploadImage,
  cloudinaryFunction,
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  dataMiddleware.ensureData(playerSchema.create),
  playerController.create
);

competitionRoutes.get(
  "/:id/players",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  playerController.get
);
