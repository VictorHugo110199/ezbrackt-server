import { Request, Response } from "express";

import { BracketService } from "../services/Brackets.service";
export class BracketController {
  async create(req: Request, res: Response) {
    const { id } = req.params;
    const data = await new BracketService().createBracket(id);

    return res.status(201).json(data);
  }

  async nextBracket(req: Request, res: Response) {
    const { id } = req.params;

    const data = await new BracketService().nextBracket(id);

    return res.json(data);
  }
}
