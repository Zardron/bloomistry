import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { app } from "./app.js";

let server;

async function bootstrap() {
  await connectDatabase();

  server = app.listen(env.PORT, () => {
    console.info(`Bloomistry API listening on port ${env.PORT}`);
  });
}

function shutdown(signal) {
  console.info(`${signal} received. Closing server...`);
  server?.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
