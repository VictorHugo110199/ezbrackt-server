import { Request, Response } from "express";

import { ICreateUser, IUserLogin, IUserUpdate } from "../interfaces/user.interface";
import { UserService } from "../services/Users.service";

export class UserController {
  async create(req: Request, res: Response) {
    const payload: ICreateUser = req.body;
    const photo: string = req.body.img.url;

    const user = await new UserService().create(payload, photo);

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const payload: IUserLogin = req.body;
    const data = await new UserService().login(payload);

    return res.status(200).json({ token: data });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const status = await new UserService().delete(id);

    return res.sendStatus(status);
  }

  async update(req: Request, res: Response) {
    const payload: IUserUpdate = req.body;
    const { id } = req.user;
    const photo: string = req.body.img.url;

    const data = await new UserService().update(payload, id, photo);

    return res.status(200).json(data);
  }

  async getUsers(req: Request, res: Response) {
    const data = await new UserService().getUsers();

    return res.status(200).json(data);
  }

  async getUsersBysId(req: Request, res: Response) {
    const { id } = req.params;
    const data = await new UserService().getUserById(id);

    return res.status(200).json(data);
  }

  async profile(req: Request, res: Response) {
    const { id } = req.user;
    const data = await new UserService().getUserById(id);

    return res.status(200).json(data);
  }
}
