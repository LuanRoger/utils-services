import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { FI_CACHE_DURATION, FI_STORE_KEY } from "@/constants";
import { FiiNotFound } from "@/shared/errors";
import { getFiByIdSchema } from "@/shared/schemas";
import { createCacheKey } from "@/utils/cache";
import { getFiiByIdResponse } from "../schemas";
import { getFiiById as getFiiByIdUseCase } from "../use-cases";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/:id", zValidator("param", getFiByIdSchema), async (c) => {
  const { id: fiId } = c.req.valid("param");

  try {
    const cacheKey = createCacheKey(FI_STORE_KEY, fiId);
    const cachedResponse = await c.env.KV.get(cacheKey);
    if (cachedResponse) {
      const parsedResponse = JSON.parse(cachedResponse);
      return c.json(parsedResponse);
    }

    const fii = await getFiiByIdUseCase(fiId);
    const parsedResponse = getFiiByIdResponse.parse(fii);

    c.env.KV.put(cacheKey, JSON.stringify(parsedResponse), {
      expirationTtl: FI_CACHE_DURATION,
    });
    return c.json(parsedResponse);
  } catch (error) {
    if (error instanceof FiiNotFound) {
      c.status(404);
      return c.text("Not Found");
    }

    c.status(500);
    if (error instanceof Error) {
      return c.json({ message: error.message });
    }

    return c.text("Internal Server Error");
  }
});

export default app;
