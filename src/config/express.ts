import express from "express";
import { routes } from "../routes/routes";
import { errorMiddleware } from "../middleware/Error.Middleware";

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export { app };
