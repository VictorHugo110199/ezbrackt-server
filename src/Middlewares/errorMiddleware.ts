import { NextFunction, Request, Response } from "express";

import { ApiError } from "../Helpers/errors";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const message = error.statusCode ? error.message : "Internal Server Error";

  return res.status(statusCode).json({ message });
};
