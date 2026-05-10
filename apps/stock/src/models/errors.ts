export class FiNotFound extends Error {
  constructor(id: string) {
    super(`FI ${id} not found`);
  }
}

export class FiHasInvalidData extends Error {
  constructor(id: string) {
    super(`FI ${id} has invalid data`);
  }
}

export class FiParseError extends Error {
  constructor() {
    super(`FI parse error`);
  }
}

export class FiNotFoundRule extends Error {
  constructor() {
    super(`FI not found rule`);
  }
}
