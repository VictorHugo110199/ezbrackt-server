import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/Errors.helper";

export class DataMiddleware {
  ensureData =
    (schema: any) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const validate = await schema.validate(req.body, {
          abortEarly: true
        });

        req.validate = validate;

        return next();
      } catch (error: any) {
        throw new BadRequestError(error.errors);
      }
    };
}
