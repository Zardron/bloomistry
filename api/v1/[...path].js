import { app } from "../../server/src/app.js";
import { connectDatabase } from "../../server/src/config/database.js";

let databaseConnection;

async function ensureDatabase() {
  databaseConnection ??= connectDatabase();
  await databaseConnection;
}

export default async function handler(req, res) {
  await ensureDatabase();
  return app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
