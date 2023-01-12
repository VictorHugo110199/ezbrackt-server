import { Router } from "express";

import { BracketsController } from "../controllers/Brackets.controller";

export const bracketsRouter = Router();

const bracketsController = new BracketsController();

bracketsRouter.post("/init/:id", bracketsController.create);
bracketsRouter.post("/winner/:idBrackets", bracketsController.winnerPlayer);
bracketsRouter.post("/createNew/:idCompetition", bracketsController.createNew);
