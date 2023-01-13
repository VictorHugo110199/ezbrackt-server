import { Router } from "express";

import { BracketsController } from "../controllers/Brackets.controller";
import { BracktesMiddleware } from "../middlewares/Brackets.middleware";

export const bracketsRouter = Router();

const bracketsController = new BracketsController();
const bracktesMiddleware = new BracktesMiddleware();

bracketsRouter.post("/init/:id", bracketsController.create);
bracketsRouter.post(
  "/winner/:idBrackets",
  bracktesMiddleware.ensurePlayerExistsOnBrackte,
  bracketsController.winnerPlayer
);
bracketsRouter.post("/createNew/:idCompetition", bracketsController.createNew);
