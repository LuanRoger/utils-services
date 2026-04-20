export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = "TodoNotFoundError";
  }
}

export class TodoCreationError extends Error {
  constructor() {
    super(`Failed to create todo`);
    this.name = "TodoCreationError";
  }
}

export class TodoUpdateError extends Error {
  constructor(id: number) {
    super(`Failed to update todo with id ${id}`);
    this.name = "TodoUpdateError";
  }
}
