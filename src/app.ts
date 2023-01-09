import "express-async-errors";
import "reflect-metadata";
import express from "express";

import { errorMiddleware } from "./Middlewares/errorMiddleware";
import { routes } from "./Routes";

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorMiddleware);
export default app;
