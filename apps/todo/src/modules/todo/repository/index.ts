import { eq } from "drizzle-orm";
import { db } from "@/db";
import { todo } from "@/db/schemas/todo";
import { TodoNotFoundError } from "../errors";
import type {
  GetAllTodosFilter,
  InsertTodoData,
  UpdateTodoData,
} from "./types";

export async function getTodoById(id: number) {
  return await db.query.todo.findFirst({
    where: {
      id,
    },
  });
}

export async function getAllTodos(filter: GetAllTodosFilter) {
  const { page, pageSize, completed, orderBy } = filter;

  return await db.query.todo.findMany({
    where: {
      completed,
    },
    orderBy: { [orderBy || "createdAt"]: "desc" },
    offset: page ? (page - 1) * pageSize : undefined,
    limit: pageSize,
  });
}

export async function createTodo(data: InsertTodoData) {
  return await db.insert(todo).values(data).returning();
}

export async function updateTodoById(id: number, data: UpdateTodoData) {
  return await db.update(todo).set(data).where(eq(todo.id, id)).returning();
}

export async function toggleTodoStatus(id: number, completed?: boolean) {
  return await db.transaction(async (tx) => {
    const existingTodo = await tx.query.todo.findFirst({
      where: {
        id,
      },
    });

    if (!existingTodo) {
      throw new TodoNotFoundError(id);
    }

    const currentStatus = existingTodo.completed;
    const newStatus = completed === undefined ? !currentStatus : completed;

    const updatedTodo = await tx
      .update(todo)
      .set({ completed: newStatus })
      .where(eq(todo.id, id))
      .returning();

    return updatedTodo;
  });
}

export async function deleteTodoById(id: number) {
  return await db.delete(todo).where(eq(todo.id, id));
}
