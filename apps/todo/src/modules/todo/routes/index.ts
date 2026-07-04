import Elysia from "elysia";
import { serialIdSchema } from "@/commons/models";
import {
  createTodoModel,
  getAllTodosQueryModel,
  toggleTodoStatusModel,
  updateTodoModel,
} from "../models";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoStatus,
  updateTodo,
} from "../use-cases";

const todoRoutes = new Elysia({ prefix: "/todos" })
  .get(
    "/",
    async ({ status, query }) => {
      const result = await getAllTodos(query);

      return status("OK", result);
    },
    {
      query: getAllTodosQueryModel,
    }
  )
  .get(
    "/:id",
    async ({ params, status }) => {
      const { id } = params;

      const result = await getTodoById(id);

      return status("OK", result);
    },
    {
      params: serialIdSchema,
    }
  )
  .post(
    "/",
    async ({ body, status }) => {
      const result = await createTodo(body);

      return status("Created", result);
    },
    {
      body: createTodoModel,
    }
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      const { id } = params;

      const result = await updateTodo(id, body);

      return status("OK", result);
    },
    { params: serialIdSchema, body: updateTodoModel }
  )
  .patch(
    "/:id",
    async ({ params, body, status }) => {
      const { id } = params;

      const result = await toggleTodoStatus(id, body);

      return status("OK", result);
    },
    { params: serialIdSchema, body: toggleTodoStatusModel }
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const { id } = params;

      await deleteTodo(id);

      return status("No Content");
    },
    {
      params: serialIdSchema,
    }
  );

export default todoRoutes;
