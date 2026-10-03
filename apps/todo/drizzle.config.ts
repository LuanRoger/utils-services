import { defineConfig } from "drizzle-kit";
import { ENV } from "varlock/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: ENV.CLOUDFLARE_ACCOUNT_ID,
    databaseId: ENV.CLOUDFLARE_DATABASE_ID,
    token: ENV.CLOUDFLARE_D1_TOKEN,
  },
});
