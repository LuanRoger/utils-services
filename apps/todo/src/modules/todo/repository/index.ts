import { eq } from "drizzle-orm";
import { todo } from "@/db/schemas/todo";
import type { DatabaseBinding } from "@/db/types";
import { TodoNotFoundError } from "../errors";
import type {
  GetAllTodosFilter,
  InsertTodoData,
  UpdateTodoData,
} from "./types";

export async function getTodoById(db: DatabaseBinding, id: number) {
  return await db.query.todo.findFirst({
    where: {
      id,
    },
  });
}

export async function getAllTodos(
  db: DatabaseBinding,
  filter: GetAllTodosFilter
) {
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

export async function createTodo(db: DatabaseBinding, data: InsertTodoData) {
  return await db.insert(todo).values(data).returning();
}

export async function updateTodoById(
  db: DatabaseBinding,
  id: number,
  data: UpdateTodoData
) {
  return await db.update(todo).set(data).where(eq(todo.id, id)).returning();
}

export async function toggleTodoStatus(
  db: DatabaseBinding,
  id: number,
  completed?: boolean
) {
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

export async function deleteTodoById(db: DatabaseBinding, id: number) {
  return await db.delete(todo).where(eq(todo.id, id));
}
