import { Request, Response, NextFunction } from "express";

import { NotFoundError } from "../helpers/Errors.helper";
import { bracketRepository } from "../repositories/bracket.repository";

export class BracketMiddleware {
  async idExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { idBrackets } = req.params;
    const bracket = await bracketRepository.findOneBy({ id: idBrackets });

    if (!bracket) {
      throw new NotFoundError("Chaveamento não encontrado.");
    }

    next();
  }
}
