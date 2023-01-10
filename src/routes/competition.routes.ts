import { Router } from "express";

import { CompetitionController } from "../controllers/Competition.controller";
import { PlayerController } from "../controllers/Player.controller";
import { CompetitionMiddleware } from "../middlewares/Competition.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";

const userMiddleware = new UserMiddleware();
const competitionController = new CompetitionController();
const competitionMiddleware = new CompetitionMiddleware();
const playerController = new PlayerController();

export const competitionRoutes = Router();

competitionRoutes.post("/", userMiddleware.tokenExists, competitionController.create);

competitionRoutes.get("/", competitionController.getCompetitions);

competitionRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
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


competitionRoutes.post("/:id/players", userMiddleware.tokenExists, playerController.create);

competitionRoutes.patch("/:id/players", userMiddleware.tokenExists, playerController.patch);

competitionRoutes.post("/:id/players", playerController.create);
competitionRoutes.get(
  "/:id/players",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  playerController.get
);

