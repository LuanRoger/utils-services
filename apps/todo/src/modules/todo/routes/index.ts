import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serialIdSchema } from "@/commons/models";
import { getDbConnection } from "@/db";
import { TodoNotFoundError } from "../errors";
import {
  createTodoModel,
  getAllTodosQueryModel,
  toggleTodoStatusModel,
  updateTodoModel,
} from "../models";
import { todoListResponseSchema, todoResponseSchema } from "../schemas";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoStatus,
  updateTodo,
} from "../use-cases";

const todoRoutes = new Hono<{ Bindings: CloudflareBindings }>();

todoRoutes.get("/", zValidator("query", getAllTodosQueryModel), async (c) => {
  const query = c.req.valid("query");
  const db = getDbConnection(c.env);

  const result = await getAllTodos(db, query);
  const parsedResult = todoListResponseSchema.parse(result);

  c.status(200);
  return c.json(parsedResult);
});

todoRoutes.get("/:id", zValidator("param", serialIdSchema), async (c) => {
  const { id } = c.req.valid("param");
  const db = getDbConnection(c.env);

  const result = await getTodoById(db, id);
  const parsedResult = todoResponseSchema.parse(result);

  c.status(200);
  return c.json(parsedResult);
});

todoRoutes.post("/", zValidator("json", createTodoModel), async (c) => {
  const body = c.req.valid("json");
  const db = getDbConnection(c.env);

  const result = await createTodo(db, body);
  const parsedResult = todoResponseSchema.parse(result);

  c.status(201);
  return c.json(parsedResult);
});

todoRoutes.put(
  "/:id",
  zValidator("param", serialIdSchema),
  zValidator("json", updateTodoModel),
  async (c) => {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const db = getDbConnection(c.env);

    const result = await updateTodo(db, id, body);
    const parsedResult = todoResponseSchema.parse(result);

    c.status(200);
    return c.json(parsedResult);
  }
);

todoRoutes.patch(
  "/:id",
  zValidator("json", toggleTodoStatusModel),
  zValidator("param", serialIdSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const db = getDbConnection(c.env);

    try {
      const result = await toggleTodoStatus(db, id, body);
      const parsedResult = todoResponseSchema.parse(result);

      c.status(200);
      return c.json(parsedResult);
    } catch (error) {
      if (error instanceof TodoNotFoundError) {
        c.status(404);
        return c.text("Not Found");
      }

      throw error;
    }
  }
);

todoRoutes.delete("/:id", zValidator("param", serialIdSchema), async (c) => {
  const { id } = c.req.valid("param");
  const db = getDbConnection(c.env);

  try {
    await deleteTodo(db, id);

    return c.json(id);
  } catch (error) {
    if (error instanceof TodoNotFoundError) {
      c.status(404);
      return c.text("Not Found");
    }

    throw error;
  }
});

export default todoRoutes;
