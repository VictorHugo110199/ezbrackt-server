import { Player } from "../entities/Players.entity";
import { ConflictError } from "../helpers/Errors.helper";
import { ICreatePlayer, IPlayerPatch } from "../interfaces/player.interface";
import { competitionRepository } from "../repositories/competition.repository";
import { playerRepository } from "../repositories/player.repository";

export class PlayerService {
  async create(payload: ICreatePlayer, id: string): Promise<Player> {
    const { name, photo } = payload;

    const competition = await competitionRepository.find({ where: { id }, relations: { players: true } });
    const foundCompetition = await competitionRepository.findOneBy({ id });

    if (competition[0].number_players <= competition[0].players.length) {
      throw new ConflictError("Esse campeonato já atingiu o número máximo de players");
    }

    const player = playerRepository.create({
      competition: { ...foundCompetition },
      name,
      photo
    });

    await playerRepository.save(player);

    return player;
  }

  async update(payload: IPlayerPatch, id: string): Promise<Player> {
    const player = await playerRepository.findOneBy({ id });
    const updatedPlayer = playerRepository.create({ ...player, ...payload });

    await playerRepository.save(updatedPlayer);
    return updatedPlayer;
  }

  async get(id: string): Promise<Player[] | undefined> {
    const competition = await competitionRepository.findOne({ where: { id }, relations: { players: true } });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return competition?.players;
  }
}
