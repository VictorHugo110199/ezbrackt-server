// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from "express";
import { ICreateCompetition, IUpdateCompetition } from "../../interfaces/competition.interface";
import { ICreatePlayer, IPlayerPatch } from "../../interfaces/player.interface";
import { ICreateUser, IUserLogin, IUserUpdate } from "../../interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        isActive: boolean;
      };
      validate: ICreateUser | ICreatePlayer | IUserLogin | ICreateCompetition | IUserUpdate | IPlayerPatch
    }
  }
}
