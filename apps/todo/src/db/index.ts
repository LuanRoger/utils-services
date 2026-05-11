import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { ENV } from "varlock/env";
import { relations } from "./relations";

const client = new SQL({
  url: ENV.DATABASE_URL,
  idleTimeout: 10,
  connectionTimeout: 30,
});
export const db = drizzle({ client, relations });
