import { ICreatePlayer } from "../interfaces/player.interface";
import { competitionRepository } from "../repositories/competition.repository";
import { playerRepository } from "../repositories/player.repository";

export class PlayerService {
  async create(payload: ICreatePlayer, id: string) {
    const { name, photo } = payload;

    const competition = await competitionRepository.findOneBy({ id });

    const player = playerRepository.create({
      competition: { ...competition },
      name,
      photo
    });

    await playerRepository.save(player);

    return player;
  }

  async get(id: string) {
    const competition = await competitionRepository.findOne({ where: { id }, relations: { players: true } });

    return competition?.players;
  }
}
