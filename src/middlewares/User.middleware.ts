import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../helpers/Errors.helper";
import { userRepository } from "../repositories/user.repository";

export class UserMiddleware {
  async emailExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;
    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new ConflictError("E-mail já cadastrado!");
    }

    next();
  }

  async isActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (user?.isActive === false) {
      throw new BadRequestError("Usuário inativo!");
    }

    next();
  }

  tokenExists(req: Request, res: Response, next: NextFunction): void {
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

  async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    next();
  }

  verifyUserLogged(req: Request, res: Response, next: NextFunction): void {
    const userId: string = req.user.id;
    const paramsId: string = req.params.id;

    if (userId !== paramsId) {
      throw new UnauthorizedError("Não é possível alterar outro usuário.");
    }

    next();
  }
}
