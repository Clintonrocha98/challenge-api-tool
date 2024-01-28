import "dotenv/config";
import express from "express";
import { routes } from "./routes/routes";
import { createTable } from "./database/postgres";

const app = express();

const port = 3000;

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
  createTable();
});
