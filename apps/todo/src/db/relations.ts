import { defineRelations } from "drizzle-orm";
import { schema } from "./schemas";

export const relations = defineRelations(schema);
