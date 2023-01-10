import { Request, Response } from "express";

import { ICreatePlayer } from "../interfaces/player.interface";
import { PlayerService } from "../services/Player.service";

export class PlayerController {
  async create(req: Request, res: Response) {
    const payload: ICreatePlayer = req.body;
    const { id } = req.params;

    const player = await new PlayerService().create(payload, id);

    return res.status(201).json(player);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const data = await new PlayerService().get(id);

    return res.status(200).json(data);
  }
}
