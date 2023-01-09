import { Router } from "express";

import { SessionController } from "../../Controllers/SessionController";

export const sessionRoutes = Router();

sessionRoutes.post("", new SessionController().login);
