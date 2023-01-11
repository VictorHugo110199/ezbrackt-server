import { Router } from "express";

import { CompetitionController } from "../controllers/Competition.controller";
import { UserController } from "../controllers/User.controller";
import { UserMiddleware } from "../middlewares/User.middleware";

const userMiddleware = new UserMiddleware();
const userController = new UserController();
const competitionController = new CompetitionController();

export const userRoutes = Router();

userRoutes.post("/", userMiddleware.emailExists, userController.create);

userRoutes.get("/", userMiddleware.tokenExists, userController.getUsers);

userRoutes.get("/:id", userMiddleware.tokenExists, userController.getUsersBysId);

userRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  userMiddleware.verifyUser,
  userMiddleware.verifyUserLogged,
  userController.update
);

userRoutes.delete(
  "/:id",
  userMiddleware.tokenExists,
  userMiddleware.verifyUser,
  userMiddleware.verifyUserLogged,
  userController.delete
);

userRoutes.get(
  "/:id/competitions",
  userMiddleware.tokenExists,
  userMiddleware.verifyUser,
  competitionController.getUserCompetition
);
