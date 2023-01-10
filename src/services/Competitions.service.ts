import { ICreateCompetition } from "../interfaces/competition.interface";
import { competitionRepository } from "../repositories/competition.repository";

export class CompetitionService {
  async create(payload: ICreateCompetition, userId: string) {
    const { name, number_players, description } = payload;

    const newCompetition = competitionRepository.create({
      name,
      number_players,
      description,
      userId
    });

    await competitionRepository.save(newCompetition);
    return newCompetition;
  }
}
