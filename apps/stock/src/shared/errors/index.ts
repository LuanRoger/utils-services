export class FiiNotFound extends Error {
  constructor(id: string) {
    super(`FII ${id} not found`);
  }
}

export class FiiHasInvalidData extends Error {
  constructor(id: string) {
    super(`FII ${id} has invalid data`);
  }
}

export class FiiParseError extends Error {
  constructor() {
    super(`FII parse error`);
  }
}

export class FiiNotFoundRule extends Error {
  constructor() {
    super(`FII not found rule`);
  }
}
