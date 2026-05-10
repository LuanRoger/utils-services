export function createCacheKey(store: string, key: string) {
  return `${store}:${key}`;
}
