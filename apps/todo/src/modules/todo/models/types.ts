import type z from "zod";
import type {
  createTodoModel,
  getAllTodosQueryModel,
  toggleTodoStatusModel,
  updateTodoModel,
} from ".";

export type GetAllTodosQueryModel = z.infer<typeof getAllTodosQueryModel>;
export type CreateTodoModel = z.infer<typeof createTodoModel>;
export type UpdateTodoModel = z.infer<typeof updateTodoModel>;
export type ToggleTodoStatusModel = z.infer<typeof toggleTodoStatusModel>;
