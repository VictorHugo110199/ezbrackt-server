import { Request, Response } from "express";

import { ICreateUser } from "../interfaces/userInterfaces/userInterface";
import { UserService } from "../Services/UserService";

export class UserController {
  async create(req: Request, res: Response) {
    const payload: ICreateUser = req.body;

    const user = await new UserService().create(payload);

    return res.status(201).json(user);
  }
}
