import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { ForbiddenError, ConflictError } from "../Helpers/errors";
import { IUserLogin } from "../interfaces/userInterfaces/userInterface";
import { userRepository } from "../Repositories/userRepository";
export class SessionServices {
  async login(payload: IUserLogin) {
    const user = await userRepository.findOne({
      where: { email: payload.email },
      select: { id: true, isActive: true, email: true, password: true }
    });
    const userPassword: string | undefined = user?.password;

    const passwordMatch = await compare(payload.password, userPassword as string);
    if (!passwordMatch) {
      throw new ForbiddenError("Usuário ou senha inválidos!");
    }
    if (!user?.isActive) throw new ConflictError("Usuário inativo!");

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      expiresIn: "24h",
      subject: user.email
    });

    return { token };
  }
}
