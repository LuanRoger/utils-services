import bearer from "@elysia/bearer";
import cors from "@elysia/cors";
import openapi from "@elysia/openapi";
import serverTiming from "@elysia/server-timing";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import logixlysia from "logixlysia";
import { ENV } from "varlock/env";
import z from "zod";
import { version } from "../package.json";
import fiagroRoutes from "./modules/fiagro/routes";
import fiisRoutes from "./modules/fiis/routes";

const appName = "@utils/stock";
const hostname = ENV.HOST || "0.0.0.0";
const port = ENV.PORT || 8082;
const mainServerUrl = ENV.MAIN_SERVER_URL;

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
  .use(
    openapi({
      documentation: {
        info: {
          title: appName,
          version,
          description:
            "Retrieve information about FIs and Fiagros in the brazilian stock market.",
          license: {
            name: "MIT",
          },
        },
        servers: [
          {
            url: "http://localhost:8082",
            description: "Local server",
          },
          {
            url: mainServerUrl,
            description: "Main server",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
        openapi: "3.2.0",
      },
      scalar: {
        theme: "deepSpace",
        showOperationId: true,
        customCss: "",
      },
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
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
