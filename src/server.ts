import "express-async-errors";
import "dotenv/config";
import { app } from "./config/express";
import { createTable } from "./database/postgres";

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
  createTable();
});
