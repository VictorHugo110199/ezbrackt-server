import { Request, Response } from "express";

import { ICreatePlayer, IPlayerPatch } from "../interfaces/player.interface";
import { PlayerService } from "../services/Player.service";

export class PlayerController {
  async create(req: Request, res: Response) {
    const payload: ICreatePlayer = req.body;
    const { id } = req.params;
    let photo;

    if (req.body.img) {
      photo = req.body.img.url;
    }

    const player = await new PlayerService().create(payload, id, photo as string);

    return res.status(201).json(player);
  }

  async update(req: Request, res: Response) {
    const payload: IPlayerPatch = req.body;
    const { id } = req.params;
    let photo;

    if (req.body.img) {
      photo = req.body.img.url;
    }

    const player = await new PlayerService().update(payload, id, photo as string);

    return res.status(200).json(player);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const data = await new PlayerService().get(id);

    return res.status(200).json(data);
  }
}
