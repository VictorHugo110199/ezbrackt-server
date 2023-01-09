import { Request, Response, NextFunction } from "express";

import { NotFoundError } from "../Helpers/errors";
import { userRepository } from "../Repositories/userRepository";

export class UserMiddleware {
  async isActive(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id });

    if (user == null) {
      throw new NotFoundError("User not found");
    }

    next();
  }
}
