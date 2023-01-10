import { Router } from "express";

import { CompetitionController } from "../controllers/Competition.controller";
import { CompetitionMiddleware } from "../middlewares/Competition.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";

const userMiddleware = new UserMiddleware();
const competitionController = new CompetitionController();
const competitionMiddleware = new CompetitionMiddleware();

export const competitionRoutes = Router();

competitionRoutes.post("/", userMiddleware.tokenExists, competitionController.create);

competitionRoutes.get("/", competitionController.getCompetition);

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
