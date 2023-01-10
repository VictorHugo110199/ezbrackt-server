import { Router } from "express";

import { CompetitionController } from "../controllers/Competition.controller";
import { UserMiddleware } from "../middlewares/User.middleware";

const userMiddleware = new UserMiddleware();
const competitionController = new CompetitionController();

export const competitionRoutes = Router();

competitionRoutes.post("/", userMiddleware.tokenExists, competitionController.create);
