import "@varlock/cloudflare-integration/init";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timing } from "hono/timing";
import { ENV } from "varlock/env";
import { echoRoutes } from "./modules/echo/routes";

const app = new Hono();
app.use(
  cors({
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "OPTIONS"],
  })
);
app.use(logger());
app.use(timing());
app.use(bearerAuth({ token: ENV.API_KEY }));

app.route("/echo", echoRoutes);

export default app;
