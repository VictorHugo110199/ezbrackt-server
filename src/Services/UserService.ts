import bcrypt from "bcrypt";

import { ConflictError } from "../Helpers/errors";
import { ICreateUser } from "../interfaces/userInterfaces/userInterface";
import { userRepository } from "../Repositories/userRepository";

export class UserService {
  async create(payload: ICreateUser) {
    const { email, isActive, name, password, photo } = payload;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists != null) {
      throw new ConflictError("E-mail already exists");
    }

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
}
