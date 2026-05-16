import bearer from "@elysia/bearer";
import cors from "@elysia/cors";
import serverTiming from "@elysia/server-timing";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import logixlysia from "logixlysia";
import { ENV } from "varlock/env";
import todoRoutes from "./modules/todo";

const port = ENV.PORT || 8081;
const hostname = ENV.HOST || "0.0.0.0";

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        service: "@utils/todo",
        showStartupMessage: true,
        startupMessageFormat: "simple",
        showContextTree: true,
        contextDepth: 2,
        slowThreshold: 150,
        verySlowThreshold: 500,
        ip: false,
      },
    })
  )
  .use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    })
  )
  .use(
    rateLimit({
      duration: ENV.RATE_LIMIT_DURATION,
      max: ENV.RATE_LIMIT_MAX,
    })
  )
  .use(serverTiming())
  .use(bearer())
  .onBeforeHandle(({ status, bearer }) => {
    const apiKey = ENV.API_KEY;

    if (bearer !== apiKey) {
      return status("Unauthorized");
    }
  })
  .use(todoRoutes)
  .get("/", () => "OK");

app.listen({ port, hostname });
