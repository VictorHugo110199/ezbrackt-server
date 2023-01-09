import { Request, Response } from "express";

import { ICreateUser, IUserLogin } from "../interfaces/userInterfaces/userInterface";
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
}
