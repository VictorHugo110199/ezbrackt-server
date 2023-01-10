import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../Helpers/errors";
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

  tokenExists(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError("Token inválido");
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
      if (error) {
        throw new UnauthorizedError("Token inválido");
      }

      req.user = {
        id: decoded.id,
        email: decoded.email,
        isActive: decoded.isActive
      };

      next();
    });
  }

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    next();
  }
}
