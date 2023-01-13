import AppDataSource from "../data-source";
import User from "../entities/User.entity";

export const userRepository = AppDataSource.getRepository(User);
