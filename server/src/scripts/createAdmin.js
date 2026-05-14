import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { User } from "../models/user.model.js";

const rl = readline.createInterface({ input, output });

async function main() {
  await connectDatabase();

  const name = await rl.question("Admin name: ");
  const email = (await rl.question("Admin email: ")).trim().toLowerCase();
  const password = await rl.question("Admin password (min 8 chars): ");

  await User.create({ name, email, password, role: "admin" });
  console.info(`Admin created for ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl.close();
    await disconnectDatabase();
  });
