import { APP_MESSAGES } from "@/constants";
import { RedisClient } from "bun";

export function initRedis() {
  const connectionString = process.env.REDIS_URL;
  if (!connectionString) {
    console.log(APP_MESSAGES.REDIS_CONNECTION_STRING_NOT_SET);
  }

  const client = new RedisClient(connectionString);

  return client;
}

export const redisClient = initRedis();
