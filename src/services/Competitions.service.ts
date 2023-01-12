import Competitions from "../entities/Competitions.entity";
import { ConflictError, UnauthorizedError } from "../helpers/Errors.helper";
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

  async update(payload: IUpdateCompetition, campId: string): Promise<Competitions> {
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

    return competitions[0];
  }

  async getCompetitions(): Promise<Competitions[]> {
    const competitions = await competitionRepository.find({
      where: {
        isActive: true
      },
      relations: {
        user: true,
        players: true,
        bracket: true
      }
    });

    return competitions;
  }

  async delete(id: string): Promise<number> {
    const competition = await competitionRepository.findOneBy({ id });

    if (competition?.isActive === false) {
      throw new ConflictError("Essa competição não está ativa!");
    }

    await competitionRepository.update(id, { isActive: false });

    return 204;
  }

  async getPlayerCompetition(id: string): Promise<Competitions[]> {
    const userFound = await userRepository.findOneBy({ id });
    const competition = await competitionRepository.find({
      where: {
        user: { id: userFound?.id }
      }
    });

    return competition;
  }
}
