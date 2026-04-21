import z from "zod";

export const getAllTodosQueryModel = z.object({
  page: z.coerce.number().positive().optional(),
  pageSize: z.coerce.number().positive().max(100).optional(),
  completed: z.enum(["true", "false"]).optional(),
  orderBy: z.enum(["createdAt", "updatedAt"]).optional(),
});
export type GetAllTodosQueryModel = z.infer<typeof getAllTodosQueryModel>;

export const createTodoModel = z.object({
  title: z.string().min(3).max(256),
  description: z.string().min(3).max(1024).optional(),
});

export type CreateTodoModel = z.infer<typeof createTodoModel>;

export const updateTodoModel = z.object({
  title: z.string().min(3).max(256).optional(),
  description: z.string().min(3).max(1024).optional(),
});

export type UpdateTodoModel = z.infer<typeof updateTodoModel>;

export const toggleTodoStatusModel = z
  .object({
    completed: z.boolean().optional(),
  })
  .optional();

export type ToggleTodoStatusModel = z.infer<typeof toggleTodoStatusModel>;
