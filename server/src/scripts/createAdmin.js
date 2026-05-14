import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { User } from "../models/user.model.js";

const sharedAdminPassword = process.env.BLOOMISTRY_ADMIN_PASSWORD;

if (!sharedAdminPassword) {
  throw new Error("Set BLOOMISTRY_ADMIN_PASSWORD before running seed:admin.");
}

const adminAccounts = [
  {
    name: "Alaine",
    email: "alaine@bloomistry.com",
    password: sharedAdminPassword,
  },
  {
    name: "Zardron",
    email: "zardron@bloomistry.com",
    password: sharedAdminPassword,
  },
];

async function upsertAdmin({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail }).select("+password");

  if (existingUser) {
    existingUser.name = name;
    existingUser.password = password;
    existingUser.role = "admin";
    existingUser.isActive = true;
    await existingUser.save();
    return "updated";
  }

  await User.create({
    name,
    email: normalizedEmail,
    password,
    role: "admin",
    isActive: true,
  });
  return "created";
}

async function main() {
  await connectDatabase();

  for (const account of adminAccounts) {
    const result = await upsertAdmin(account);
    console.info(`Admin ${result} for ${account.email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
