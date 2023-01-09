import { Request, Response } from "express";

import { ICreateUser, IUserLogin, IUserUpdate } from "../interfaces/userInterfaces/userInterface";
import { UserService } from "../Services/UserService";

export class UserController {
  async create(req: Request, res: Response) {
    const payload: ICreateUser = req.body;

    const user = await new UserService().create(payload);

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const payload: IUserLogin = req.body;
    const data = await new UserService().login(payload);

    return res.status(200).json(data);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const status = await new UserService().delete(id);

    return res.sendStatus(status);
  }

  async patch(req: Request, res: Response) {
    const payload: IUserUpdate = req.body;
    const userId: string = req.user.id;
    const paramsId: string = req.params.id;

    const data = await new UserService().patch(payload, userId, paramsId);

    return res.status(200).json(data);
  }

  async getUsers(req: Request, res: Response) {
    const data = await new UserService().getUsers();

    return res.status(200).json(data);
  }

  async profile(req: Request, res: Response) {
    const { id } = req.user;
    const data = await new UserService().profile(id);

    return res.status(200).json(data);
  }
}
