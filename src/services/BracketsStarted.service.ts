import { Brackets } from "../entities/Bracket.entity";
import Competitions from "../entities/Competitions.entity";
import { BadRequestError } from "../helpers/Errors.helper";
import { bracketRepository } from "../repositories/bracket.repository";
import { competitionRepository } from "../repositories/competition.repository";
import { playerRepository } from "../repositories/player.repository";

export class BracketsStartedService {
  async create(idCompetition: string): Promise<Competitions | null> {
    const competition = await competitionRepository.findOne({
      where: {
        id: idCompetition
      },
      relations: {
        players: true,
        bracket: true
      }
    });

    if (!competition?.bracket.length) {
      const players = competition?.players;

      const playerSort = players?.sort(() => Math.random() - 0.5);

      if (playerSort) {
        for (let i = 0; i < playerSort.length; i += 2) {
          const bracket = bracketRepository.create({
            competition: { id: idCompetition },
            player1: { ...playerSort[i] },
            currentRound: Math.ceil(playerSort.length / 2)
          });

          if (playerSort[i + 1]) {
            bracket.player2 = playerSort[i + 1];
          }
          await bracketRepository.save(bracket);
        }
      }
    }

    const competitionBracket = await competitionRepository.findOne({
      where: {
        id: idCompetition
      },
      relations: {
        players: true,
        bracket: {
          player1: true,
          player2: true,
          winner: true,
          loser: true
        }
      }
    });

    return competitionBracket;
  }

  async winnerPlayer(idBrackets: string, winner: string): Promise<Brackets | null> {
    const bracket = await bracketRepository.findOne({
      where: {
        id: idBrackets
      },
      relations: {
        player1: true,
        player2: true,
        winner: true,
        loser: true,
        competition: true
      }
    });

    if (winner && bracket) {
      const playerWinner = await playerRepository.findOneBy({
        id: winner
      });
      if (playerWinner) {
        bracket.winner = playerWinner;
      }
      if (bracket.player2 == null) {
        bracket.loser = null;
      } else if (winner === bracket.player1.id) {
        const playerLoser = await playerRepository.findOneBy({
          id: bracket.player2.id
        });

        if (playerLoser) {
          bracket.loser = playerLoser;
        }
      } else {
        const playerLoser = await playerRepository.findOneBy({
          id: bracket.player1.id
        });

        if (playerLoser) {
          bracket.loser = playerLoser;
        }
      }
      await bracketRepository.save(bracket);
    }
    if (bracket) {
      this.createNewBracket(bracket?.competition.id);
    }

    return bracket;
  }

  async createNewBracket(idCompetition: string): Promise<Competitions | null> {
    const competitionBracket = await competitionRepository.findOne({
      where: {
        id: idCompetition
      },
      relations: {
        players: true,
        bracket: {
          player1: true,
          player2: true,
          winner: true,
          loser: true
        }
      }
    });

    if (!competitionBracket?.bracket.length) {
      throw new BadRequestError("O chaveamento ainda não foi criado!");
    }

    let finishBracket = true;
    const playersWinner: any[] = [];
    let currentRound = 99;

    competitionBracket?.bracket.map((bracket) => {
      if (currentRound > bracket.currentRound) {
        currentRound = bracket.currentRound;
      }
    });

    competitionBracket?.bracket.map((bracket) => {
      if (!bracket.winner) {
        finishBracket = false;
      }
      if (currentRound === bracket.currentRound) {
        playersWinner.push(bracket.winner);
      }
    });

    if (finishBracket) {
      if (playersWinner.length >= 2) {
        const orderswitching = 0 > Math.random() - 0.5;
        console.log(orderswitching);
        if (orderswitching) {
          for (let i = 0; i < playersWinner.length; i += 2) {
            const bracket = bracketRepository.create({
              competition: { id: idCompetition },
              player1: { ...playersWinner[i] },
              currentRound: Math.ceil(playersWinner.length / 2)
            });

            if (playersWinner[i + 1]) {
              bracket.player2 = playersWinner[i + 1];
            }

            await bracketRepository.save(bracket);
          }
        } else {
          for (let i = playersWinner.length - 1; i >= 0; i -= 2) {
            const bracket = bracketRepository.create({
              competition: { id: idCompetition },
              player1: { ...playersWinner[i] },
              currentRound: Math.ceil(playersWinner.length / 2)
            });

            if (playersWinner[i - 1]) {
              bracket.player2 = playersWinner[i - 1];
            }

            await bracketRepository.save(bracket);
          }
        }
      }
    }

    const competition = await competitionRepository.findOne({
      where: {
        id: idCompetition
      },
      relations: {
        players: true,
        bracket: {
          player1: true,
          player2: true,
          winner: true,
          loser: true
        }
      }
    });

    return competition;
  }
}
