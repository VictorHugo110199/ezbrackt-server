import AppDataSource from "../data-source";
import { Player } from "../entities/Players.entity";

export const playerRepository = AppDataSource.getRepository(Player);
