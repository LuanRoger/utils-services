import { CACHE_DURATION } from "@/constants";
import { dateReviver } from "@/utils/date";
import { redisClient } from "./redis";

export async function getValueCache<T>(key: string): Promise<T | null> {
  const value = await redisClient.get(key);
  if (!value) {
    return null;
  }

  const valueToReturn = JSON.parse(value, dateReviver) as T;
  return valueToReturn;
}

export async function setValueCache(key: string, value: unknown) {
  const jsonValue = JSON.stringify(value);
  await redisClient.set(key, jsonValue, "EX", CACHE_DURATION);
}
