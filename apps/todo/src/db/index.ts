import { drizzle } from "drizzle-orm/bun-sql";
import { ENV } from "varlock/env";
import { relations } from "./relations";
import { SQL } from "bun";

const client = new SQL({
  url: ENV.DATABASE_URL,
  idleTimeout: 10,
  connectionTimeout: 30,
})
export const db = drizzle({ client, relations });
