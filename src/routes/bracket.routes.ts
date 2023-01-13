import { Router } from "express";

import { BracketsController } from "../controllers/Brackets.controller";
import { BracketMiddleware } from "../middlewares/Bracket.middleware";
import { CompetitionMiddleware } from "../middlewares/Competition.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";

export const bracketsRouter = Router();

const bracketsController = new BracketsController();
const bracketMiddleware = new BracketMiddleware();
const userMiddleware = new UserMiddleware();
const competitionMiddleware = new CompetitionMiddleware();

bracketsRouter.post(
  "/:id",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  competitionMiddleware.idValid,
  bracketsController.create
);

bracketsRouter.post(
  "/winner/:idBrackets",
  userMiddleware.tokenExists,
  bracketMiddleware.idExists,
  bracketsController.winnerPlayer
);

bracketsRouter.post(
  "/games/:idCompetition",
  userMiddleware.tokenExists,
  competitionMiddleware.idExists,
  bracketsController.createNewBracket
);
