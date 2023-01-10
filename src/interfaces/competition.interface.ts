import { IBracket } from "./bracket.interface";
import { IPlayer } from "./player.interface";

export interface ICompetition {
  name: string;
  status: boolean;
  number_players: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  players: IPlayer[];
  brackets: IBracket[];
  isActive?: boolean;
  userId: string;
}

export interface ICreateCompetition {
  name: string;
  number_players: number;
  description?: string;
}

export interface IUpdateCompetition {
  name?: string;
  description?: string;
}
