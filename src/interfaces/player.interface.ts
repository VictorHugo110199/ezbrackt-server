export interface IPlayer {
  name: string;
  createdAt: Date;
  photo?: string;
  competitions: string;
}

export interface ICreatePlayer {
  name: string;
  photo?: string;
}
