import Competitions from "../entities/Competitions.entity";
import { UnauthorizedError } from "../helpers/Errors.helper";
import { ICreateCompetition, IUpdateCompetition } from "../interfaces/competition.interface";
import { competitionRepository } from "../repositories/competition.repository";
import { userRepository } from "../repositories/user.repository";

export class CompetitionService {
  async create(payload: ICreateCompetition, userId: string): Promise<Competitions> {
    const { name, number_players, description } = payload;

    const foundUser = await userRepository.findOneBy({ id: userId });

    const newCompetition = competitionRepository.create({
      name,
      number_players,
      description,
      user: { ...foundUser }
    });

    await competitionRepository.save(newCompetition);
    return newCompetition;
  }

  async update(payload: IUpdateCompetition, campId: string) {
    const competition = await competitionRepository.findOneBy({ id: campId });

    if (payload.hasOwnProperty("number_players") || payload.hasOwnProperty("isActive")) {
      throw new UnauthorizedError("Não é possível atualizar os campos: isActive e number_players");
    }

    const updatedCompetition = competitionRepository.create({
      ...competition,
      ...payload
    });

    await competitionRepository.save(updatedCompetition);

    const competitions = await competitionRepository.find({
      where: {
        id: campId
      },
      relations: {
        user: true
      }
    });

    return competitions;
  }

  async getCompetitions() {
    const competitions = await competitionRepository.find({
      where: {
        isActive: true
      },
      relations: {
        user: true
      }
    });

    return competitions;
  }
}
