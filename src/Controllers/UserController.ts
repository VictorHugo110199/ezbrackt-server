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

  async patch(req: Request, res: Response) {
    const payload: IUserUpdate = req.body;
    const userId: string = req.user.id;
    const paramsId: string = req.params.id;

    const data = await new UserService().patch(payload, userId, paramsId);

    return res.status(201).json(data);
  }
}
