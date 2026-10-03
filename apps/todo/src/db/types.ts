import type { getDbConnection } from ".";

export type DatabaseBinding = ReturnType<typeof getDbConnection>;
