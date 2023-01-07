import AppDataSource from "../data-source";
import User from "../Entities/UserEntity";

export const userRepository = AppDataSource.getRepository(User);
