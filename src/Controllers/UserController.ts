import { Request, Response } from "express";

import { createUserInterface } from "../interfaces/userInterfaces/userInterface";
import { UserService } from "../Services/UserService";

export class UserController {
  async create(req: Request, res: Response) {
    const payload: createUserInterface = req.body;

    const user = await new UserService().create(payload);

    return res.status(201).json(user);
  }
}
