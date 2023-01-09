import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { UnauthorizedError, ConflictError, NotFoundError } from "../Helpers/errors";
import { ICreateUser, IUser, IUserLogin, IUserUpdate } from "../interfaces/userInterfaces/userInterface";
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

  async delete(id: string): Promise<number> {
    const user = await userRepository.findOneBy({ id });

    if (!user?.isActive) {
      throw new ConflictError("Usuário não está ativo!");
    }

    await userRepository.update(id, { isActive: false });

    return 204;
  }

  async patch(payload: IUserUpdate, userId: string, paramsId: string): Promise<IUser> {
    const user = await userRepository.findOneBy({ id: userId });

    if (userId !== paramsId) {
      throw new UnauthorizedError("Não é possível alterar outro usuário.");
    }

    if (payload.hasOwnProperty("isActive") || payload.hasOwnProperty("id")) {
      throw new UnauthorizedError("Não é possível atualizar os campos: isActive e id");
    }

    const updatedUser = userRepository.create({
      ...user,
      ...payload
    });

    await userRepository.save(updatedUser);
    const { password: removedPassword, ...updatedUserReturn } = updatedUser;
    return updatedUserReturn;
  }

  async getUsers() {
    const users = await userRepository.createQueryBuilder("users").getMany();
    return users;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundError("Usuário inexistente.");
    }
    return user;
  }
}
