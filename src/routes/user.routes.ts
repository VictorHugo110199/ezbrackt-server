import { Router } from "express";

import { UserController } from "../controllers/User.controller";
import { UserMiddleware } from "../middlewares/User.middleware";

const userMiddleware = new UserMiddleware();
const userController = new UserController();

export const userRoutes = Router();

userRoutes.post("/", userMiddleware.emailExists, userController.create);

userRoutes.get("/", userMiddleware.tokenExists, userController.getUsers);

userRoutes.get("/:id", userMiddleware.tokenExists, userController.getUsersBysId);

userRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  userMiddleware.verifyUser,
  userMiddleware.verifyUserLogged,
  userController.patch
);

userRoutes.delete(
  "/:id",
  userMiddleware.tokenExists,
  userMiddleware.verifyUser,
  userMiddleware.verifyUserLogged,
  userController.delete
);
