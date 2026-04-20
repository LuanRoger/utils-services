import z from "zod";

export const createTodoModel = z.object({
  title: z.string().max(256),
  description: z.string().max(1024).optional(),
});

export type CreateTodoModel = z.infer<typeof createTodoModel>;

export const updateTodoModel = z.object({
  title: z.string().max(256).optional(),
  description: z.string().max(1024).optional(),
});

export type UpdateTodoModel = z.infer<typeof updateTodoModel>;

export const toggleTodoStatusModel = z
  .object({
    completed: z.boolean().optional(),
  })
  .optional();

export type ToggleTodoStatusModel = z.infer<typeof toggleTodoStatusModel>;
