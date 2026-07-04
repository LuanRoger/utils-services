import z from "zod";

export const getAllTodosQueryModel = z.object({
  page: z.coerce.number().positive().default(1),
  pageSize: z.coerce.number().positive().max(100).default(10),
  completed: z.enum(["true", "false"]).optional(),
  orderBy: z.enum(["createdAt", "updatedAt"]).optional(),
});

export const createTodoModel = z.object({
  title: z.string().min(3).max(256),
  description: z.string().min(3).max(1024).optional(),
});

export const updateTodoModel = z.object({
  title: z.string().min(3).max(256).optional(),
  description: z.string().min(3).max(1024).optional(),
});

export const toggleTodoStatusModel = z.object({
  completed: z.boolean().optional(),
});
