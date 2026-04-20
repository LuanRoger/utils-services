import { serialIdSchema } from "@/commons/models";
import Elysia from "elysia";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoStatus,
  updateTodo,
} from "./handlers";
import {
  TodoCreationError,
  TodoNotFoundError,
  TodoUpdateError,
} from "./errors";
import {
  createTodoModel,
  toggleTodoStatusModel,
  updateTodoModel,
} from "./models";

export const TodoModule = new Elysia({ prefix: "/todos" })
  .error({
    TODO_NOT_FOUND: TodoNotFoundError,
    TODO_CREATION_ERROR: TodoCreationError,
    TODO_UPDATE_ERROR: TodoUpdateError,
  })
  .onError(({ status, code, error }) => {
    switch (code) {
      case "TODO_NOT_FOUND":
        return status(404, { message: error.message });
      case "TODO_CREATION_ERROR":
        return status(500, { message: error.message });
      case "TODO_UPDATE_ERROR":
        return status(500, { message: error.message });
    }
  })
  .get("/", async ({ status }) => {
    const result = await getAllTodos();

    return status("OK", result);
  })
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
    },
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
    },
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
    { params: serialIdSchema, body: updateTodoModel },
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
    { params: serialIdSchema, body: toggleTodoStatusModel },
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
    },
  );
