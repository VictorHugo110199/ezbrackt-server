import AppDataSource from "../data-source";
import { Brackets } from "../entities/Bracket.entity";

export const bracketRepository = AppDataSource.getRepository(Brackets);
