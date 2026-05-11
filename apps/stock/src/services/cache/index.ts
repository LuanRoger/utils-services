import { RedisClient } from "bun";
import { ENV } from "varlock/env";
import { CACHE_DURATION } from "@/constants";
import { dateReviver } from "@/utils/date";

const cacheClient = new RedisClient(ENV.REDIS_URL);

export async function getValueCache<T>(key: string): Promise<T | null> {
  const value = await cacheClient.get(key);
  if (!value) {
    return null;
  }

  const valueToReturn = JSON.parse(value, dateReviver) as T;
  return valueToReturn;
}

export async function setValueCache(key: string, value: unknown) {
  const jsonValue = JSON.stringify(value);
  await cacheClient.set(key, jsonValue, "EX", CACHE_DURATION);
}
