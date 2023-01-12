export interface IPlayer {
  name: string;
  photo?: string;
  competition: string;
  inGame: boolean;
}

export interface ICreatePlayer {
  name: string;
  photo?: string;
}

export interface IPlayerPatch {
  name?: string;
  photo?: string;
  inGame?: boolean;
}
