// biome-ignore lint/performance/noNamespaceImport: This will be spread into the schema object
import * as todo from "./todo";

export const schema = {
  ...todo,
};
