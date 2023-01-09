import { Request, Response } from "express";

import { IUserLogin } from "../interfaces/userInterfaces/userInterface";
import { SessionServices } from "../Services/SessionService";

export class SessionController {
  async login(req: Request, res: Response) {
    const payload: IUserLogin = req.body;
    const data = await new SessionServices().login(payload);

    return res.status(200).json(data);
  }
}
