import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/Errors.helper";

export class DataMiddleware {
  ensureData = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = await schema.validate(req.body, {
        abortEarly: false
      });

      req.validate = validate;
      return next();
    } catch (error: any) {
      throw new BadRequestError(error.errors);
    }
  };
}
