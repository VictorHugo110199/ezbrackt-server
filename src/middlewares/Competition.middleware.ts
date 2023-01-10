import { Request, Response, NextFunction } from "express";

import { NotFoundError, UnauthorizedError } from "../helpers/Errors.helper";
import { competitionRepository } from "../repositories/competition.repository";

export class CompetitionMiddleware {
  async idExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const competition = await competitionRepository.findOneBy({ id });

    if (!competition) {
      throw new NotFoundError("Competição não encontrada.");
    }
    next();
  }

  async idValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const userId = req.user.id;

    const competitions = await competitionRepository.find({
      where: {
        id
      },
      relations: {
        user: true
      }
    });

    if (competitions[0].user.id !== userId) {
      throw new UnauthorizedError("Campeonato inválido.");
    }

    next();
  }
}
