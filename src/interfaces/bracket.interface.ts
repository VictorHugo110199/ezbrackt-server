import { IPlayer } from "./player.interface";

export interface IBracket {
  bracket: string;
  key_bracket: number;
  player_1: IPlayer;
  player_1_status: string;
  player_2: IPlayer;
  player_2_status: string;
  winner_player: IPlayer;
  status: string;
  competition: string;
}
