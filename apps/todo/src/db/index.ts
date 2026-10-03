import { drizzle } from "drizzle-orm/d1";
import { relations } from "./relations";

export function getDbConnection(c: CloudflareBindings) {
  return drizzle(c.DB, { relations });
}
