import express from "express";
import "reflect-metadata";

const app = express();

app.use(express.json());

export default app;
