import bearer from "@elysia/bearer";
import cors from "@elysia/cors";
import serverTiming from "@elysia/server-timing";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import logixlysia from "logixlysia";
import { ENV } from "varlock/env";
import fiagroRoutes from "./modules/fiagro/routes";
import fiisRoutes from "./modules/fiis/routes";

const hostname = ENV.HOST || "0.0.0.0";
const port = ENV.PORT || 8082;

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        service: "@utils/stock",
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
      methods: ["GET", "OPTIONS"],
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
  .onBeforeHandle(({ set, status, bearer }) => {
    const apiKey = ENV.API_KEY;

    if (bearer !== apiKey) {
      set.status = 401;
      return status("Unauthorized");
    }
  })
  .use(fiisRoutes)
  .use(fiagroRoutes);

app.listen({ hostname, port });
