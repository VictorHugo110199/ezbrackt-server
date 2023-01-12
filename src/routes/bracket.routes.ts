import { Router } from "express";

import { BracketsController } from "../controllers/Brackets.controller";

const bracketsRouter = Router();

bracketsRouter.post("/init/:id", new BracketsController().create);
bracketsRouter.post("/winner/:idBrackets", new BracketsController().winnerPlayer);
bracketsRouter.post("/createNew/:idCompetition", new BracketsController().createNew);

export default bracketsRouter;
