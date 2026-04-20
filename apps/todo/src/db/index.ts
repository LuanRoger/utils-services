import { drizzle } from "drizzle-orm/bun-sql";
import { ENV } from "varlock/env";
import { schema } from "./schemas";

export const db = drizzle(ENV.DATABASE_URL, { schema });
