import { bracketRepository } from "../repositories/bracket.repository";
import { playerRepository } from "../repositories/player.repository";

export class BracketService {
  async createBracket(idCompetition: string) {
    const getPlayer = await playerRepository.find({ where: { competition: { id: idCompetition } } });
    const playerSort = getPlayer.sort(() => Math.random() - 0.5);
    const result = [];

    for (let i = 0; i < playerSort.length; i += 2) {
      const bracket = bracketRepository.create({
        competition: { id: idCompetition },
        player1: { ...playerSort[i] },
        player2: { ...playerSort[i + 1] },
        currentRound: getPlayer.length / 2,
        keyRound: 1
      });
      await bracketRepository.save(bracket);
      result.push(bracket);
    }

    const bracketReturn = result.map((bracket) => {
      const { currentRound: _, ...bracketInfo } = bracket;

      return bracketInfo;
    });

    return bracketReturn;
  }
}
