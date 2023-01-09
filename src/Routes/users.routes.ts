import { Router } from "express";

const routerUser = Router();

routerUser.post("");
routerUser.get("");
routerUser.get("/:id");
routerUser.patch("/:id");
routerUser.delete("/:id");

export default routerUser;
