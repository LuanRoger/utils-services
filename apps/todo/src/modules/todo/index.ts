import Elysia from "elysia";
import { serialIdSchema } from "@/commons/models";
import {
  TodoCreationError,
  TodoNotFoundError,
  TodoUpdateError,
} from "./errors";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoStatus,
  updateTodo,
} from "./handlers";
import {
  createTodoModel,
  getAllTodosQueryModel,
  toggleTodoStatusModel,
  updateTodoModel,
} from "./models";

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
      if (!result) {
        throw new TodoNotFoundError(id);
      }

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
      if (result.length !== 1) {
        throw new TodoCreationError();
      }

      const newTodo = result[0];
      return status("Created", newTodo);
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
      if (result.length !== 1) {
        throw new TodoUpdateError(id);
      }

      const updatedTodo = result[0];
      return status("OK", updatedTodo);
    },
    { params: serialIdSchema, body: updateTodoModel }
  )
  .patch(
    "/:id",
    async ({ params, body, status }) => {
      const { id } = params;

      const result = await toggleTodoStatus(id, body);
      if (result.length !== 1) {
        throw new TodoUpdateError(id);
      }

      const updatedTodo = result[0];
      return status("OK", updatedTodo);
    },
    { params: serialIdSchema, body: toggleTodoStatusModel }
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const { id } = params;

      const existingTodo = await getTodoById(id);
      if (!existingTodo) {
        throw new TodoNotFoundError(id);
      }

      await deleteTodo(id);

      return status("No Content");
    },
    {
      params: serialIdSchema,
    }
  );

export default todoRoutes;
