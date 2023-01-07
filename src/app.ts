import "express-async-errors";
import "reflect-metadata";
import express from "express";

import { errorMiddleware } from "./Middlewares/errorMiddleware";

const app = express();

app.use(express.json());

app.use(errorMiddleware);
export default app;
