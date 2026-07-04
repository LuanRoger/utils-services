import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { todo } from "@/db/schemas/todo";

export const insertTodoSchema = createInsertSchema(todo);
export const updateTodoSchema = createUpdateSchema(todo);
