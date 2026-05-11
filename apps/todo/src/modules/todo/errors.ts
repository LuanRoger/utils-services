export class TodoNotFoundError extends Error {
  status = 404;

  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = "TodoNotFoundError";
  }

  toResponse() {
    return Response.json(
      {
        error: this.message,
        code: this.status,
      },
      {
        status: this.status,
      }
    );
  }
}

export class TodoCreationError extends Error {
  status = 500;

  constructor() {
    super("Failed to create todo");
    this.name = "TodoCreationError";
  }

  toResponse() {
    return Response.json(
      {
        error: this.message,
        code: this.status,
      },
      {
        status: this.status,
      }
    );
  }
}

export class TodoUpdateError extends Error {
  status = 500;

  constructor(id: number) {
    super(`Failed to update todo with id ${id}`);
    this.name = "TodoUpdateError";
  }

  toResponse() {
    return Response.json(
      {
        error: this.message,
        code: this.status,
      },
      {
        status: this.status,
      }
    );
  }
}

export class TodoDatabaseError extends Error {
  status = 500;

  constructor(message: string) {
    super(`Database error: ${message}`);
    this.name = "TodoDatabaseError";
  }

  toResponse() {
    return Response.json(
      {
        error: this.message,
        code: this.status,
      },
      {
        status: this.status,
      }
    );
  }
}
