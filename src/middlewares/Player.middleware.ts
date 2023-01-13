import { Request, Response, NextFunction } from "express";

import { NotFoundError, UnauthorizedError } from "../helpers/Errors.helper";
import { competitionRepository } from "../repositories/competition.repository";
import { playerRepository } from "../repositories/player.repository";

export class PlayerMiddleware {
  async idExist(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const player = await playerRepository.findOneBy({ id });

    if (!player) {
      throw new NotFoundError("Jogador não encontrado.");
    }
    next();
  }

  async ensurePlayerOwnerCompetition(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const userId = req.user.id;

    const player = await playerRepository.find({
      where: {
        id
      },
      relations: {
        competition: true
      }
    });

    const competitionId = player[0].competition.id;

    const competition = await competitionRepository.find({
      where: {
        id: competitionId
      },
      relations: {
        user: true
      }
    });

    if (userId !== competition[0].user.id) {
      throw new UnauthorizedError("Não é possivel atualizar esse jogador!");
    }
    next();
  }
}
