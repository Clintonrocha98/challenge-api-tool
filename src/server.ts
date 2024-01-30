import "dotenv/config";
import "express-async-errors";
import { app } from "./config/express";
import { routes } from "./routes/routes";
import { createTable } from "./database/postgres";

const port = 3000;

app.use(routes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
  createTable();
});
