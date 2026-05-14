import { app } from "../server/src/app.js";
import { connectDatabase } from "../server/src/config/database.js";

let databaseConnection;

async function ensureDatabase() {
  databaseConnection ??= connectDatabase();
  await databaseConnection;
}

function normalizeExpressUrl(req) {
  const requestUrl = new URL(req.url ?? "/api/v1", "http://bloomistry.local");
  const rewritePath = requestUrl.searchParams.get("path") ?? "";
  requestUrl.searchParams.delete("path");

  const normalizedPath = rewritePath
    ? `/api/v1/${rewritePath.replace(/^\/+/, "")}`
    : "/api/v1";
  const search = requestUrl.searchParams.toString();

  req.url = search ? `${normalizedPath}?${search}` : normalizedPath;
}

export default async function handler(req, res) {
  await ensureDatabase();
  normalizeExpressUrl(req);
  return app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
