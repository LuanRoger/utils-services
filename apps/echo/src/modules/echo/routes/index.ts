import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { echoQuery } from "../schemas";

const app = new Hono();

app.get("/", zValidator("query", echoQuery), (c) => {
  const text = c.req.valid("query");

  return c.json({ text });
});

export { app as echoRoutes };
