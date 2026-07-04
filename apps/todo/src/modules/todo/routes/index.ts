import Elysia from "elysia";
import z from "zod";
import { serialIdSchema } from "@/commons/models";
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

const todoRoutes = new Elysia({ prefix: "/todos" })
  .get(
    "/",
    async ({ status, query }) => {
      const result = await getAllTodos(query);
      const parsedResult = todoListResponseSchema.parse(result);

      return status("OK", parsedResult);
    },
    {
      detail: {
        operationId: "getAllTodos",
        description: "Get all todos",
      },
      query: getAllTodosQueryModel,
      response: {
        200: todoListResponseSchema,
        500: z.string(),
      },
    }
  )
  .get(
    "/:id",
    async ({ params, status }) => {
      const { id } = params;

      const result = await getTodoById(id);
      const parsedResult = todoResponseSchema.parse(result);

      return status("OK", parsedResult);
    },
    {
      detail: {
        operationId: "getTodoById",
        description: "Get a todo by id",
      },
      params: serialIdSchema,
      response: {
        200: todoResponseSchema,
        500: z.string(),
      },
    }
  )
  .post(
    "/",
    async ({ body, status }) => {
      const result = await createTodo(body);
      const parsedResult = todoResponseSchema.parse(result);

      return status("Created", parsedResult);
    },
    {
      detail: {
        operationId: "createTodo",
        description: "Create a todo",
      },
      body: createTodoModel,
      response: {
        201: todoResponseSchema,
        500: z.string(),
      },
    }
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      const { id } = params;

      const result = await updateTodo(id, body);
      const parsedResult = todoResponseSchema.parse(result);

      return status("OK", parsedResult);
    },
    {
      detail: {
        operationId: "updateTodo",
        description: "Update a todo",
      },
      params: serialIdSchema,
      body: updateTodoModel,
      response: {
        200: todoResponseSchema,
        500: z.string(),
      },
    }
  )
  .patch(
    "/:id",
    async ({ params, body, status, set }) => {
      const { id } = params;

      try {
        const result = await toggleTodoStatus(id, body);
        const parsedResult = todoResponseSchema.parse(result);

        return status("OK", parsedResult);
      } catch (error) {
        if (error instanceof TodoNotFoundError) {
          set.status = 404;
          return status("Not Found", "Not Found");
        }

        throw error;
      }
    },
    {
      detail: {
        operationId: "toggleTodoStatus",
        description: "Toggle todo status",
      },
      params: serialIdSchema,
      body: toggleTodoStatusModel,
      response: {
        200: todoResponseSchema,
        404: z.literal("Not Found"),
        500: z.string(),
      },
    }
  )
  .delete(
    "/:id",
    async ({ params, status, set }) => {
      const { id } = params;

      try {
        await deleteTodo(id);

        return status("OK", id);
      } catch (error) {
        if (error instanceof TodoNotFoundError) {
          set.status = 404;
          return status("Not Found", "Not Found");
        }

        throw error;
      }
    },
    {
      detail: {
        operationId: "deleteTodo",
        description: "Delete a todo",
      },
      params: serialIdSchema,
      response: {
        200: z.number().describe("ID of the deleted item"),
        404: z.literal("Not Found"),
        500: z.string(),
      },
    }
  );

export default todoRoutes;
