import { Router } from "express";

import { CompetitionController } from "../controllers/Competition.controller";
import { UserController } from "../controllers/User.controller";
import User from "../entities/User.entity";
import { cloudinaryFunction, uploadImage } from "../middlewares/photo.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";
import { userRepository } from "../repositories/user.repository";

const userMiddleware = new UserMiddleware();
const userController = new UserController();
const competitionController = new CompetitionController();

export const userRoutes = Router();

userRoutes.get("/teste/:id", async (req, res) => {
  const { id } = req.params;
  const teste = await userRepository
    .createQueryBuilder()
    .select("users.photo")
    .from(User, "users")
    .where("users.id = :id", { id })
    .getOne();

  return res.send(teste);
});

userRoutes.post("/", uploadImage, cloudinaryFunction, userMiddleware.emailExists, userController.create);

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
