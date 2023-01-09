import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../Helpers/errors";
import { ICreateUser, IUserLogin } from "../interfaces/userInterfaces/userInterface";
import { userRepository } from "../Repositories/userRepository";

export class UserService {
  async create(payload: ICreateUser) {
    const { email, isActive, name, password, photo } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
      isActive,
      photo
    });

    await userRepository.save(newUser);

    const { password: removePass, ...user } = newUser;

    return user;
  }

  async login({ email, password }: IUserLogin) {
    const user = await userRepository.findOne({
      select: { id: true, isActive: true, email: true, password: true },
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedError("Usuário ou senha inválido!");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Usuário ou senha inválidos!");
    }

    const token = jwt.sign({ id: user?.id }, process.env.SECRET_KEY as string, {
      expiresIn: "24h",
      subject: user?.email
    });

    return { token };
  }
}
