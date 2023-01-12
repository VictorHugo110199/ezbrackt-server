import { Request, Response } from "express";

import { BracketsStartedService } from "../services/BracketsStarted.service";

export class BracketsController {
  async create(req: Request, res: Response) {
    const id: string = req.params.id;
    const data = await new BracketsStartedService().create(id);
    return res.status(201).json(data);
  }

  async winnerPlayer(req: Request, res: Response) {
    const idBrackets: string = req.params.idBrackets;
    const winner: string = req.body.winner;
    const data = await new BracketsStartedService().winnerPlayer(idBrackets, winner);
    return res.status(201).json(data);
  }

  async createNew(req: Request, res: Response) {
    const idCompetition: string = req.params.idCompetition;
    const newBrackets = await new BracketsStartedService().createNew(idCompetition);
    return res.status(201).json(newBrackets);
  }
}
