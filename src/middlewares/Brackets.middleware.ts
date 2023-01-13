import { Request, Response, NextFunction } from "express";

import { NotFoundError } from "../helpers/Errors.helper";
import { bracketRepository } from "../repositories/bracket.repository";

export class BracktesMiddleware {
  async ensurePlayerExistsOnBrackte(req: Request, res: Response, next: NextFunction): Promise<void> {
    const idBrackets = req.params.idBrackets;
    const { winner } = req.body;

    const bracket = await bracketRepository.findOne({
      where: {
        id: idBrackets
      },
      relations: {
        player1: true,
        player2: true,
        winner: true,
        loser: true,
        competition: true
      }
    });

    if (winner !== bracket?.player1.id && bracket?.player2.id !== bracket?.player1.id && winner) {
      throw new NotFoundError("player Não encontrado!");
    }

    next();
  }
}
