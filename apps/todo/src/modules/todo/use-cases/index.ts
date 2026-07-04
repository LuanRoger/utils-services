import {
  TodoCreationError,
  TodoNotFoundError,
  TodoUpdateError,
} from "../errors";
import type {
  CreateTodoModel,
  GetAllTodosQueryModel,
  ToggleTodoStatusModel,
  UpdateTodoModel,
} from "../models/types";
import {
  createTodo as createTodoRepository,
  deleteTodoById as deleteTodoByIdRepository,
  getAllTodos as getAllTodosRepository,
  getTodoById as getTodoByIdRepository,
  toggleTodoStatus as toggleTodoStatusRepository,
  updateTodoById as updateTodoByIdRepository,
} from "../repository";

export async function getTodoById(id: number) {
  const result = await getTodoByIdRepository(id);
  if (!result) {
    throw new TodoNotFoundError(id);
  }

  const transformedResult = {
    ...result,
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
  };
  return transformedResult;
}

export async function getAllTodos(query: GetAllTodosQueryModel) {
  const { page, pageSize, completed, orderBy } = query;

  let completedFilter: boolean | undefined;
  if (completed === "true") {
    completedFilter = true;
  } else if (completed === "false") {
    completedFilter = false;
  }

  const result = await getAllTodosRepository({
    page,
    pageSize,
    completed: completedFilter,
    orderBy,
  });
  const transformedResult = result.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return transformedResult;
}

export async function createTodo(model: CreateTodoModel) {
  const result = await createTodoRepository(model);
  if (result.length !== 1) {
    throw new TodoCreationError();
  }

  const newTodo = result[0];
  const transformedResult = {
    ...newTodo,
    createdAt: newTodo.createdAt.toISOString(),
    updatedAt: newTodo.updatedAt.toISOString(),
  };
  return transformedResult;
}

export async function updateTodo(id: number, model: UpdateTodoModel) {
  const result = await updateTodoByIdRepository(id, model);
  if (result.length !== 1) {
    throw new TodoUpdateError(id);
  }

  const updatedTodo = result[0];
  const transformedResult = {
    ...updatedTodo,
    createdAt: updatedTodo.createdAt.toISOString(),
    updatedAt: updatedTodo.updatedAt.toISOString(),
  };
  return transformedResult;
}

export async function toggleTodoStatus(
  id: number,
  model: ToggleTodoStatusModel
) {
  const { completed } = model || {};

  const result = await toggleTodoStatusRepository(id, completed);
  if (result.length !== 1) {
    throw new TodoUpdateError(id);
  }

  const updatedTodo = result[0];
  const transformedResult = {
    ...updatedTodo,
    createdAt: updatedTodo.createdAt.toISOString(),
    updatedAt: updatedTodo.updatedAt.toISOString(),
  };
  return transformedResult;
}

export async function deleteTodo(id: number) {
  const todoToDelete = await getTodoByIdRepository(id);
  if (!todoToDelete) {
    throw new TodoNotFoundError(id);
  }

  await deleteTodoByIdRepository(id);
}
