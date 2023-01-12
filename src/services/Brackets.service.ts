import { bracketRepository } from "../repositories/bracket.repository";
import { competitionRepository } from "../repositories/competition.repository";
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
        currentRound: getPlayer.length / 2
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

  async nextBracket(id: string) {
    const nextRound = [];
    const rounds = [];
    const result = [];

    const competition = await competitionRepository.find({
      where: {
        id
      },
      relations: {
        bracket: true
      }
    });

    const getBrackets = competition[0].bracket;

    for (let i = 0; i < getBrackets.length; i++) {
      const bracket = await bracketRepository.find({
        where: {
          id: getBrackets[i].id
        },
        relations: {
          player1: true,
          player2: true
        }
      });
      rounds.push(bracket);
    }

    const getPlayer = await playerRepository.find({ where: { competition: { id } } });

    for (let i = 0; i < rounds.length; i++) {
      for (let j = 0; j < rounds[i].length; j++) {
        if (rounds[i][j].player1.inGame) {
          nextRound.push(rounds[i][j].player1);
        }
        if (rounds[i][j].player2.inGame) {
          nextRound.push(rounds[i][j].player2);
        }
      }
    }
    console.log(nextRound);
    for (let i = 0; i < nextRound.length; i += 2) {
      const bracket = bracketRepository.create({
        competition: { id },
        player1: { ...nextRound[i] },
        player2: { ...nextRound[i + 1] },
        currentRound: Math.floor(nextRound.length / 2)
      });
      await bracketRepository.save(bracket);
      result.push(bracket);
    }

    return result;
  }
}
