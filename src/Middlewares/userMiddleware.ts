import { Request, Response, NextFunction } from "express";

import { ConflictError } from "../Helpers/errors";
import { userRepository } from "../Repositories/userRepository";
export class UserMiddleware {
  async emailExist(req: Request, res: Response, next: NextFunction) {
    const userEmail = req.body.email;
    const userExists = await userRepository.findOneBy({ email: userEmail });

    if (userExists != null) {
      throw new ConflictError("E-mail already exists");
    }
    next();
  }
}
