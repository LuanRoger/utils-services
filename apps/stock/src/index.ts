import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timing } from "hono/timing";
import { ENV } from "varlock/env";
import fiagroRoutes from "./modules/fiagro/routes";
import fiisRoutes from "./modules/fiis/routes";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
  "/*",
  cors({
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "OPTIONS"],
  })
);
app.use(logger());
app.use(timing());
app.use(bearerAuth({ token: ENV.API_KEY }));
app.route("/fiis", fiisRoutes);
app.route("/fiagro", fiagroRoutes);

export default app;
