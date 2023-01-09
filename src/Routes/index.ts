import { Router } from "express";

import { sessionRoutes } from "./sessionRoutes/sessionRoutes";
import { userRoutes } from "./userRoutes/userRoutes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/login", sessionRoutes);
