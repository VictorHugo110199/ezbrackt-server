import bcrypt, { compare } from "bcrypt";
import { instanceToInstance } from "class-transformer";
import jwt from "jsonwebtoken";

import { UnauthorizedError, ConflictError, NotFoundError } from "../helpers/Errors.helper";
import { ICreateUser, IUser, IUserLogin, IUserUpdate } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

export class UserService {
  async create(payload: ICreateUser, photo?: string): Promise<IUser> {
    const { email, isActive, name, password } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
      isActive,
      photo
    });

    await userRepository.save(newUser);
    return instanceToInstance(newUser);
  }

  async login({ email, password }: IUserLogin): Promise<string> {
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

    return token;
  }

  async delete(id: string): Promise<number> {
    const user = await userRepository.findOneBy({ id });

    if (!user?.isActive) {
      throw new ConflictError("Usuário não está ativo!");
    }

    await userRepository.update(id, { isActive: false });
    return 204;
  }

  async update(payload: IUserUpdate, id: string, photo?: string): Promise<IUser | null> {
    const { email, name, password } = payload;
    let hashPassword;

    const users = await userRepository
      .createQueryBuilder("users")
      .where("users.email = :email", { email: email })
      .getExists();

    if (users) {
      throw new ConflictError("E-mail já cadastrado!");
    }

    const user = await userRepository.findOneBy({ id });

    if (password) {
      hashPassword = bcrypt.hashSync(password, 10);
    }

    const keys = Object.keys(payload);

    if (keys.includes("isActive") || keys.includes("id")) {
      throw new UnauthorizedError("Não é possível atualizar os campos: isActive e id");
    }

    if (photo) {
      await userRepository.update(id, {
        ...user,
        email,
        name,
        password: hashPassword,
        photo
      });

      const updatedUser = userRepository.findOneBy({ id });
      return instanceToInstance(updatedUser);
    }

    await userRepository.update(id, {
      ...user,
      email,
      name,
      password: hashPassword
    });

    const updatedUser = userRepository.findOneBy({ id });
    return instanceToInstance(updatedUser);
  }

  async getUsers(): Promise<IUser[]> {
    const users = await userRepository.find({
      where: { isActive: true }
    });

    return users;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    return user;
  }
}
