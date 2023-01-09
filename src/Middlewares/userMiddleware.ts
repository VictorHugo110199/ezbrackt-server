import { Request, Response, NextFunction } from "express";

import { ConflictError, NotFoundError } from "../Helpers/errors";
import { userRepository } from "../Repositories/userRepository";
export class UserMiddleware {
  async emailExists(req: Request, res: Response, next: NextFunction) {
    const userEmail = req.body.email;
    const userExists = await userRepository.findOneBy({ email: userEmail });

    if (userExists != null) {
      throw new ConflictError("E-mail já cadastrado!");
    }

    next();
  }

  async isActive(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id });

    if (user == null) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    next();
  }
}
