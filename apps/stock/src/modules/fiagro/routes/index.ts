import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { FI_CACHE_DURATION, FI_STORE_KEY } from "@/constants";
import { FiiNotFound } from "@/shared/errors";
import { getFiByIdSchema } from "@/shared/schemas";
import { createCacheKey } from "@/utils/cache";
import { getFiagroByIdResponse } from "../schemas";
import { getFiagroById as getFiagroByIdUseCase } from "../use-cases";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/:id", zValidator("param", getFiByIdSchema), async (c) => {
  const { id: fiId } = c.req.valid("param");

  try {
    const cacheKey = createCacheKey(FI_STORE_KEY, fiId);
    const cachedResponse = await c.env.KV.get(cacheKey);
    if (cachedResponse) {
      return c.json(cachedResponse);
    }

    const fi = await getFiagroByIdUseCase(fiId);
    const parsedResponse = getFiagroByIdResponse.parse(fi);

    await c.env.KV.put(cacheKey, JSON.stringify(parsedResponse), {
      expirationTtl: FI_CACHE_DURATION,
    });
    c.status(200);
    return c.json(parsedResponse);
  } catch (error) {
    if (error instanceof FiiNotFound) {
      c.status(404);
      return c.json("Not Found");
    }
    if (error instanceof Error) {
      c.status(500);
      return c.json({ message: error.message });
    }

    c.status(500);
    return c.text("Internal Server Error");
  }
});

export default app;
