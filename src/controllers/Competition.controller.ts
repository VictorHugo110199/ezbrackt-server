import { Request, Response } from "express";

import { ICreateCompetition, IUpdateCompetition } from "../interfaces/competition.interface";
import { CompetitionService } from "../services/Competitions.service";

export class CompetitionController {
  async create(req: Request, res: Response) {
    const payload: ICreateCompetition = req.body;
    const { id } = req.user;

    const competition = await new CompetitionService().create(payload, id);

    return res.status(201).json(competition);
  }

  async update(req: Request, res: Response) {
    const payload: IUpdateCompetition = req.body;
    const { id } = req.params;

    const competitionUpdated = await new CompetitionService().update(payload, id);

    return res.status(200).json(competitionUpdated);
  }

  async getCompetition(req: Request, res: Response) {
    const competitions = await new CompetitionService().getCompetitions();

    return res.json(competitions);
  }
}
