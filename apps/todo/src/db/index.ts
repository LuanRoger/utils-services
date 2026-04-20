import { ENV } from "varlock/env";
import { drizzle } from "drizzle-orm/bun-sql";
import { schema } from "./schemas";

export const db = drizzle(ENV.DATABASE_URL, { schema });
