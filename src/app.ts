import "express-async-errors";
import "reflect-metadata";
import express from "express";

import { errorMiddleware } from "./Middlewares/errorMiddleware";
import routerLogin from "./Routes/login.routes";
import routerUser from "./Routes/users.routes";

const app = express();

app.use(express.json());
app.use("/users", routerUser);
app.use("/login", routerLogin);

app.use(errorMiddleware);
export default app;
