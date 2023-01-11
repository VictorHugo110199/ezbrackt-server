import { Request, Response, NextFunction } from "express";

import { NotFoundError } from "../helpers/Errors.helper";
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
}
