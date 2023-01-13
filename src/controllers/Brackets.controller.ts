import { Request, Response } from "express";

import { BracketsStartedService } from "../services/BracketsStarted.service";

export class BracketsController {
  async create(req: Request, res: Response) {
    const { id } = req.params;
    const data = await new BracketsStartedService().create(id);

    return res.status(201).json(data);
  }

  async winnerPlayer(req: Request, res: Response) {
    const { idBrackets } = req.params;
    const winner: string = req.body.winner;
    const data = await new BracketsStartedService().winnerPlayer(idBrackets, winner);

    return res.status(201).json(data);
  }

  async createNewBracket(req: Request, res: Response) {
    const { idCompetition } = req.params;
    const newBrackets = await new BracketsStartedService().createNewBracket(idCompetition);

    return res.status(201).json(newBrackets);
  }
}
