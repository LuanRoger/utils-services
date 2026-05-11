import { CACHE_DURATION } from "@/constants";
import { dateReviver } from "@/utils/date";
import { redis } from "bun";

export async function getValueCache<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  if (!value) {
    return null;
  }

  const valueToReturn = JSON.parse(value, dateReviver) as T;
  return valueToReturn;
}

export async function setValueCache(key: string, value: unknown) {
  const jsonValue = JSON.stringify(value);
  await redis.set(key, jsonValue, "EX", CACHE_DURATION);
}
