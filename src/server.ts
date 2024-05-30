import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import { appErrors } from "./errors/appErrors";
import { pageNotFound } from "./errors/pageNotFound";
import { sqliteConnection } from "./databases/sqlite3";
import { runMigrations } from "./databases/sqlite3/migrations";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

const whiteLIst = ["http://localhost:5173", "http://127.0.0.1:5173"];
app.use(cors({ origin: whiteLIst, credentials: true }));
app.use(routes);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

sqliteConnection()
  .then(() => console.log("Database is connected..."))
  .catch((error) => console.error("Database isn't connected -", error));

runMigrations();
