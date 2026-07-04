import type z from "zod";
import type { insertTodoSchema, updateTodoSchema } from "./schemas";

export type GetAllTodosFilter = {
  page: number;
  pageSize: number;
  completed?: boolean;
  orderBy?: "createdAt" | "updatedAt";
};

export type InsertTodoData = z.infer<typeof insertTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;
