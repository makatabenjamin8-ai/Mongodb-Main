import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv({ path: "./.env" });

try {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await mongoose.connect(process.env.DATABASE_URL);

  const users = mongoose.connection.collection("users");
  const indexes = await users.indexes();
  const legacyRoleIndex = indexes.find(
    (index) =>
      index.name === "role_1" &&
      index.unique === true &&
      index.key.role === 1 &&
      Object.keys(index.key).length === 1
  );

  if (legacyRoleIndex) {
    await users.dropIndex(legacyRoleIndex.name);
    console.log("Removed obsolete unique index role_1 from users.");
  } else {
    console.log("No obsolete unique role_1 index found on users.");
  }
} catch (error) {
  console.error("Failed to remove obsolete unique role index:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
