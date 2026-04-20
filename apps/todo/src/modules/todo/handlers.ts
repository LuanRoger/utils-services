import { eq } from "drizzle-orm";
import { db } from "@/db";
import { todo } from "@/db/schemas/todo";
import { TodoNotFoundError } from "./errors";
import type {
  CreateTodoModel,
  ToggleTodoStatusModel,
  UpdateTodoModel,
} from "./models";

export async function getTodoById(id: number) {
  const result = await db.query.todo.findFirst({
    where: (todo, { eq }) => eq(todo.id, id),
  });

  return result;
}

export async function getAllTodos() {
  const result = await db.query.todo.findMany();

  return result;
}

export async function createTodo(model: CreateTodoModel) {
  const result = await db.insert(todo).values(model).returning();

  return result;
}

export async function updateTodo(id: number, model: UpdateTodoModel) {
  const result = await db
    .update(todo)
    .set(model)
    .where(eq(todo.id, id))
    .returning();

  return result;
}

export async function toggleTodoStatus(
  id: number,
  model?: ToggleTodoStatusModel
) {
  const { completed } = model || {};

  const result = await db.transaction(async (tx) => {
    const existingTodo = await tx.query.todo.findFirst({
      where: (todo, { eq }) => eq(todo.id, id),
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

  return result;
}

export async function deleteTodo(id: number) {
  await db.delete(todo).where(eq(todo.id, id));
}
