import AppDataSource from "../data-source";
import Competitions from "../entities/Competitions.entity";

export const competitionRepository = AppDataSource.getRepository(Competitions);
