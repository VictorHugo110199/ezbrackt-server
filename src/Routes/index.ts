import { Router } from "express";

import { userRoutes } from "./userRoutes/userRoutes";

export const routes = Router();

routes.use("/users", userRoutes);
