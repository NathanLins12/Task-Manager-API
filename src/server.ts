import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import { pageNotFound } from "./errors/pageNotFound";
import { appErrors } from "./errors/appErrors";
import { sqliteConnection } from "./database/sqlite3";
import { runMigrations } from "./database/sqlite3/migrations";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server conected...`);
});

sqliteConnection()
  .then(() => console.log("Database is conected"))
  .catch((error) => console.error("Database isn't conected -", error));

runMigrations();
